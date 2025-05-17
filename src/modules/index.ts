import { ComponentRegistry } from './ComponentRegistry';
import { DataStore } from './DataStore';
import { Event } from './Event';
import Actions from './Actions/Actions';
import TimerListModule from './CustomModules/TimerList';
import TimerDisplayModule from './TimerDisplay';
import TimerCards from './TimerCards';
import navbarModule from './Navbar';
import audioStoreModule from './AudioStore';
import timerMenuModule from './TimerMenu';
import timerAlarmToneModule from './TimerAlarmTone';
import customEventHandlerModule from './CustomEventHandler';

const modules = [
  {
    __init__: ['dataStore', 'eventBus', 'componentRegistry'],
    dataStore: ['type', DataStore],
    componentRegistry: ['type', ComponentRegistry],
    eventBus: ['type', Event],
    DataStoreClass: ['value', DataStore],
  },
  navbarModule,
  Actions,
  TimerListModule,
  TimerDisplayModule,
  TimerCards,
  audioStoreModule,
  timerMenuModule,
  timerAlarmToneModule,
  customEventHandlerModule,
] as const;

export type ModuleType = typeof modules;

export default modules;
