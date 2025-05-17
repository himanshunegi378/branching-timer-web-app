import { TimerAlarmToneModule } from './TimerAlarmToneModule';

const timerAlarmToneModule = {
  __depends__: ['timerMenu', 'dataStore', 'timerCards', 'actions', 'componentRegistry'],
  __init__: ['timerAlarmTone'],
  timerAlarmTone: ['type', TimerAlarmToneModule],
};

export default timerAlarmToneModule;
