import { EventEmitter } from 'stream';
import { v4 } from 'uuid';
import { TimerCard as TimerCardType } from './TimerCards.types';
import produce from 'immer';

export class TimerCardStore {
  eventBus: EventEmitter;
  timerCardData: TimerCardType;
  timerCardId: string;

  constructor(timerCardId: string, eventBus: EventEmitter) {
    this.eventBus = eventBus;
    this.timerCardId = timerCardId;

    this.timerCardData = {
      id: this.timerCardId,
      timerGroup: { id: v4(), name: 'unnamed', timers: [] },
      looping: false,
      status: 'stopped',
      currentTimer: undefined,
    };
  }

  public updateCardData(cb: (draftTimerCard: TimerCardType) => void) {
    this.timerCardData = produce(this.timerCardData, cb);
    this.eventBus.emit('timercard:updated');
  }
}
