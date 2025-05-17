import { TimerMenuModule } from './TimerMenuModule';

const timerMenuModule = {
  __depends__: ['eventBus', 'dataStore', 'componentRegistry', 'actions'],
  __init__: ['timerMenu'],
  timerMenu: ['type', TimerMenuModule],
};

export default timerMenuModule;
