import { Injector } from 'didi';
import { ComponentRegistry } from '../core/ComponentRegistry';
import { DataStore } from '../core/DataStore';
import { Event } from '../core/Event';
import { TimerCard } from '../contexts/TimerCards/TimerCard';
import { TimerList } from '../features/TimerList/TimerList';
import { TimerDisplay } from '../features/TimerDisplay/TimerDisplay';
import { ActionType } from '../core/Actions/Actions';

export interface ServiceMap {
  dataStore: DataStore<unknown>;
  componentRegistry: ComponentRegistry;
  eventBus: Event;
  actions: ActionType;
  timerList: TimerList;
  timerDisplay: TimerDisplay;
  timerCard: TimerCard;
}

export type StrictInjector = Injector<ServiceMap>;
