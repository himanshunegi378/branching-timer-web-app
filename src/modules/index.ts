import { ComponentRegistry } from './ComponentRegistry';
import { DataStore } from './DataStore';
import { Event } from './Event';
import Actions from './Actions/Actions';
import TimerListModule from './CustomModules/TimerList';
import TimerDisplayModule from './TimerDisplay';

const modules = [
  {
    __init__: ['dataStore', 'eventBus', 'componentRegistry'],
    dataStore: ['type', DataStore],
    componentRegistry: ['type', ComponentRegistry],
    eventBus: ['type', Event],
  },
  Actions,
  TimerListModule,
  TimerDisplayModule,
] as const;

export type ModuleType = typeof modules;

export default modules;
