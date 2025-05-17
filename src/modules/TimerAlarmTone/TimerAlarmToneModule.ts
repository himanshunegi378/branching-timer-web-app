import { set } from 'lodash';
import AlarmTonePlayer from './components/AlarmTonePlayer';
import AlarmToneSelectionList from './components/AlarmToneSelectionList';
import { localStorage } from '../../utils/localStorage';

export class TimerAlarmToneModule {
  static $inject = [
    'timerMenu',
    'dataStore',
    'timerCards',
    'actions',
    'componentRegistry',
  ];

  private timerMenu: any;
  private dataStore: any;
  private timerCards: any;
  private componentRegistry: any;
  private actions: any;

  private readonly CHANGE_ALARM_TONE_KEY = 'timerAlarmTone/changeAlarmTone';

  constructor(
    timerMenu: any,
    dataStore: any,
    timerCards: any,
    actions: any,
    componentRegistry: any
  ) {
    this.componentRegistry = componentRegistry;
    this.actions = actions;
    this.timerMenu = timerMenu;
    this.dataStore = dataStore;
    this.timerCards = timerCards;

    this.closeAlarmToneModal();
    this.dataStore.setData('alarmStore', {});
    this.actions.register(
      this.CHANGE_ALARM_TONE_KEY,
      this.openAlarmToneModal.bind(this)
    );
    this.componentRegistry.register(
      'board',
      'alarmToneModal',
      AlarmToneSelectionList
    );

    this.componentRegistry.register(
      'board',
      'alarmTonePlayer',
      AlarmTonePlayer
    );

    this.timerMenu.addItem('Change Alarm Tone', this.CHANGE_ALARM_TONE_KEY);
    this.init();
  }

  async init() {
    const alarmStore = await localStorage.getItem('alarmStore');
    if (alarmStore) {
      this.dataStore.setProduceData((draft: { alarmStore: any }) => {
        draft.alarmStore = alarmStore;
      });
    }
  }

  setAlarmTone({
    alarmId,
    timerCardId,
    timerId,
  }: {
    alarmId: string;
    timerCardId: string;
    timerId: string;
  }) {
    this.dataStore.setProduceData(
      (draft: { alarmStore: Record<string, Record<string, string>> }) => {
        set(draft.alarmStore, [timerCardId, timerId], alarmId);
      }
    );

    localStorage.setItem('alarmStore', this.dataStore.getData('alarmStore'));
  }

  openAlarmToneModal(context: any) {
    this.dataStore.setData(IS_ALARM_TONE_MODAL_OPEN_KEY, {
      isOpen: true,
      context,
    });
  }

  closeAlarmToneModal() {
    this.dataStore.setData(IS_ALARM_TONE_MODAL_OPEN_KEY, {
      isOpen: false,
      context: null,
    });
  }
}

export const IS_ALARM_TONE_MODAL_OPEN_KEY = 'isAlarmToneModalOpen';
