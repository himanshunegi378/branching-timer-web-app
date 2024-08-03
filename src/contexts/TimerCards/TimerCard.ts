import EventEmitter from 'events';
import produce from 'immer';
import { v4 } from 'uuid';
import CountdownTimer from '../../lib/countdownTimer';
import { SoundPlayer } from '../../lib/soundPlayer/SoundPlayer';
import showNotification from '../../utils/notification';
import {
  Timer as TimerType,
  TimerCard as TimerCardType,
} from './TimerCards.types';
//@ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import defaultSound from './alarm.mp3';
import { audioStorage } from '../../lib/audio-storage/AudioStorage';
import { ITimerCardStorage } from '../../lib/timerCardStorage/ITimerCardStotrage';
import Timer from './Timer';
import { Plugin } from '../../plugins/Plugin';

export type runningTimerType = {
  id: string;
  remainingTime: number;
};
export class TimerCard extends EventEmitter {
  timerCardData: TimerCardType;
  timerCardId: string;
  countDownTimer: CountdownTimer;
  runningTimer: runningTimerType;
  audioPlayer: SoundPlayer;
  plugins: Plugin[] = [];
  _storage: ITimerCardStorage;
  injector: unknown;
  constructor(timerCardId: string, storage: ITimerCardStorage) {
    super();
    this._storage = storage;
    this.timerCardId = timerCardId;
    this.timerCardData = {
      id: this.timerCardId,
      timerGroup: { id: v4(), name: 'unnamed', timers: [] },
      looping: false,
      status: 'stopped',
      currentTimer: undefined,
    };
    this.load();
    this.audioPlayer = new SoundPlayer();
    this.runningTimer = {
      id: '',
      remainingTime: 0,
    };
    this.countDownTimer = new CountdownTimer();
    this.on('new_connection', () => {
      this.emitTimerCardData();
      this.emitRunningTimer();
    });
    this.on('_play', () => {
      this.playCard();
    });
    this.on('_stop', () => {
      this.stopCard();
    });
  }

  public addPlugin(plugin: Plugin) {
    this.plugins.push(plugin);
    plugin.execute({ timerCard: this });
    this.emit('plugin/added', plugin);
  }

  public set storage(v: ITimerCardStorage) {
    this._storage = v;
  }

  get timer() {
    return new Timer(this);
  }

  public getTimerData() {
    return this.timerCardData;
  }

  //will be ivoked on anychange to timercardata
  private emitTimerCardData() {
    this.emit('timer_data', this.timerCardData);
  }
  //will be invoked on any change to runningTimer data
  private emitRunningTimer() {
    this.emit('running_timer', { ...this.runningTimer });
  }

  public updateCardData(cb: (draftTimerCard: TimerCardType) => void) {
    this.timerCardData = produce(this.timerCardData, cb);
    this.emitTimerCardData();
    this.save();
  }

  private async timerFinished(timerId: string) {
    this.emit('timerFinished', timerId);
  }

  addTimer(timerData: Omit<TimerType, 'id' | 'options'>) {
    const { name, time } = timerData;
    this.updateCardData((draftTimerCardData) => {
      draftTimerCardData.timerGroup.timers.push({
        id: v4(),
        name: name,
        time: time,
        options: {},
        tasks: { data: {}, order: [] },
      });
    });
  }

  removeTimer(IdOfTimerToRemove: string) {
    this.updateCardData((draftTimerCardData) => {
      draftTimerCardData.timerGroup.timers =
        draftTimerCardData?.timerGroup.timers.filter(
          (timer) => timer.id !== IdOfTimerToRemove
        );
    });
  }

  toggleLoop() {
    this.updateCardData((draftTimerCardData) => {
      draftTimerCardData.looping = !draftTimerCardData.looping;
    });
  }

  editTimer(
    timerId: string,
    options: Partial<Omit<TimerType, 'id' | 'options'>>
  ) {
    this.updateCardData((draftCardData) => {
      const timers = draftCardData.timerGroup.timers.map((timer) => {
        if (timer.id !== timerId) return timer;
        return { ...timer, ...options };
      });
      draftCardData.timerGroup.timers = timers;
    });
  }
  async addAudioToTimer(timerId: string, audioBlob: Blob[]) {
    const timer = this.timerCardData.timerGroup.timers.find(
      (timer) => timer.id === timerId
    );
    const audioId = v4();
    await audioStorage.save(audioId, audioBlob, {
      name: `${timer?.name}_${audioId}`,
    });

    //check and delete existing audio

    const existingAudioId = timer?.options.audioId;
    existingAudioId && (await audioStorage.delete(existingAudioId));

    //add new audoio id
    this.updateCardData((draft) => {
      draft.timerGroup.timers = draft.timerGroup.timers.map((timer) => {
        if (timerId !== timer.id) {
          return timer;
        } else {
          timer.options.audioId = audioId;
          return timer;
        }
      });
    });
  }

  async removeAudioFromTimer(timerId: string) {}

  renameTimerCard(newName: string) {
    this.updateCardData((draftCardData) => {
      draftCardData.timerGroup.name = newName;
    });
  }

  private onTimerTick = (remainingTime: number) => {
    this.runningTimer.remainingTime = remainingTime;
    this.emitRunningTimer();
  };

  private onTimerFinished = () => {
    try {
      const currentTimerId = this.timerCardData.currentTimer?.id;
      const currentTimerIndex = this.timerCardData.timerGroup.timers.findIndex(
        (timer) => timer.id === currentTimerId
      );

      this.timerFinished(this.timerCardData.currentTimer!.id);

      //check if current timer is last timer
      if (this.timerCardData.timerGroup.timers[currentTimerIndex + 1]) {
        const nextTimer =
          this.timerCardData.timerGroup.timers[currentTimerIndex + 1];
        this.updateCardData((draftCardData) => {
          draftCardData.currentTimer = {
            id: nextTimer.id,
            remainingTime: nextTimer.time,
            totalTime: nextTimer.time,
          };
        });
        this.emit('_play');
      } else {
        //--if loop is on get the first one else stop timer card
        if (this.timerCardData.looping) {
          const nextTimer = this.timerCardData.timerGroup.timers[0];
          this.updateCardData((draftCardData) => {
            draftCardData.currentTimer = {
              id: nextTimer.id,
              remainingTime: nextTimer.time,
              totalTime: nextTimer.time,
            };
          });
          this.emit('_play');
        } else {
          this.emit('_stop');
        }
      }
    } catch (e) {
      console.log(e);
      console.log(this.timerCardData);
    }
  };

  playCard = () => {
    if (this.timerCardData.currentTimer) {
      this.updateCardData((draft) => {
        draft.status = 'playing';
      });
      this.runningTimer.id = this.timerCardData.currentTimer.id;
      this.runningTimer.remainingTime =
        this.timerCardData.currentTimer!.remainingTime;
      this.emitRunningTimer();
      this.countDownTimer.off('tick');
      this.countDownTimer.off('finished');
      this.countDownTimer.on('tick', this.onTimerTick);
      this.countDownTimer.on('finished', this.onTimerFinished);
      this.countDownTimer.play(this.timerCardData.currentTimer!.remainingTime);
    } else {
      const firstTimer = this.timerCardData.timerGroup.timers[0];
      if (firstTimer) {
        this.updateCardData((draft) => {
          draft.currentTimer = {
            id: firstTimer.id,
            remainingTime: firstTimer.time,
            totalTime: firstTimer.time,
          };
          draft.status = 'playing';
        });
        this.runningTimer.id = this.timerCardData.currentTimer!.id;
        this.runningTimer.remainingTime =
          this.timerCardData.currentTimer!.remainingTime;
        this.emitRunningTimer();
        this.countDownTimer.off('tick');
        this.countDownTimer.off('finished');
        this.countDownTimer.on('tick', this.onTimerTick);
        this.countDownTimer.on('finished', this.onTimerFinished);
        this.countDownTimer.play(
          this.timerCardData.currentTimer!.remainingTime
        );
      }
    }
  };

  pauseCard = () => {
    this.countDownTimer.stop();
    this.updateCardData((draftCardData) => {
      draftCardData.status = 'paused';
      draftCardData.currentTimer!.remainingTime =
        this.runningTimer.remainingTime;
    });
  };

  stopCard = () => {
    this.countDownTimer.stop();
    this.runningTimer = { id: '', remainingTime: 0 };
    this.updateCardData((draftCardData) => {
      draftCardData.status = 'stopped';
      draftCardData.currentTimer = undefined;
    });
    this.emitRunningTimer();
  };

  async onTimerCardDelete() {
    this.countDownTimer.stop();
    this.countDownTimer.off('tick');
    this.countDownTimer.off('finished');
    await this.deleteStorageData();
    this.removeAllListeners();
  }
  save() {
    const timerCardData: TimerCardType = JSON.parse(
      JSON.stringify(this.timerCardData)
    );
    if (timerCardData.status === 'playing') {
      timerCardData.status = 'paused';
      timerCardData.currentTimer!.remainingTime =
        this.runningTimer.remainingTime;
    }
    this._storage.save(timerCardData);
  }
  private async load() {
    const timerCardData = await this._storage.load(this.timerCardId);
    if (timerCardData) {
      this.timerCardData = timerCardData;
      this.updateCardData((draftcardData) => undefined);
      if (timerCardData.currentTimer) {
        this.runningTimer = {
          id: timerCardData.currentTimer.id,
          remainingTime: timerCardData.currentTimer.remainingTime,
        };
        this.emitRunningTimer();
      }
    }
  }
  private async deleteStorageData() {
    const promises: Promise<any>[] = [];
    this.timerCardData.timerGroup.timers.forEach((timer) => {
      const audioId = timer.options.audioId;
      if (audioId) {
        promises.push(audioStorage.delete(audioId));
      }
    });
    await Promise.all(promises);
    return this._storage.delete(this.timerCardId);
  }
}
