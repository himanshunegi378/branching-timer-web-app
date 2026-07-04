import { ComponentRegistry } from '../core/ComponentRegistry';
import { DataStore } from '../core/DataStore';
import { Event } from '../core/Event';
import Actions from '../core/Actions/Actions';
import TimerListModule from '../features/TimerList';
import TimerDisplayModule from '../features/TimerDisplay';

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
