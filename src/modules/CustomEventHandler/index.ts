import { CustomEventHandlerModule } from './CustomEventHandlerModule';

const customEventHandlerModule = {
  __depends__: ['eventBus', 'dataStore', 'timerMenu', 'actions'],
  __init__: ['customEventHandler'],
  customEventHandler: ['type', CustomEventHandlerModule],
};

export default customEventHandlerModule;
