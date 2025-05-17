import { Event } from '../Event';
import { DataStore } from '../DataStore';
import {
  Script,
  ScriptStore,
  ScriptStoreLocalStoragePersist,
} from './ScriptStore';
import { ComponentRegistry } from '../ComponentRegistry';
import CustomEventModal from './Components/CustomEventModal';

export class CustomEventHandlerModule {
  static $inject = [
    'eventBus',
    'dataStore',
    'timerMenu',
    'actions',
    'componentRegistry',
  ];
  scriptStore: ScriptStore;

  constructor(
    private eventBus: Event,
    private dataStore: DataStore<any>,
    private timerMenu: any,
    private actions: any,
    private componentRegistry: ComponentRegistry
  ) {
    this.componentRegistry.register(
      'board',
      'customEventModal',
      CustomEventModal
    );
    this.scriptStore = new ScriptStore(
      this.dataStore,
      new ScriptStoreLocalStoragePersist()
    );
    this.actions.register(
      'customEventHandler/open',
      this.openCustomEventHandlerModal.bind(this)
    );
    this.actions.register(
      'customEventHandler/close',
      this.closeCustomEventHandlerModal.bind(this)
    );

    this.timerMenu.addItem('Custom Event Handler', 'customEventHandler/open');
    this.eventBus.onAny(
      (event: string, context: any) =>
        console.log(`Event: ${event}, Context: ${context}`)
      //   this.executeCustomEvent(event, context)
    );
  }

  getAvailableEvents(): string[] {
    // Return an array of available events
    // For example:
    return ['running_timer'];
  }

  public openCustomEventHandlerModal(context: any) {
    this.dataStore.setData('customEventHandler/isOpen', {
      isOpen: true,
      context,
    });
  }

  public closeCustomEventHandlerModal() {
    this.dataStore.setData('customEventHandler/isOpen', {
      isOpen: false,
      context: null,
    });
  }

  async executeCustomEvent(event: string, context: any) {
    const customEvents = await this.scriptStore.getScripts();
    const customEvent = customEvents.find((e) => e.name === event);
    if (customEvent) {
      // Execute the custom script
      // For example:
      // eslint-disable-next-line no-new-func
      const script = new Function(customEvent.script);
      script(context);
    }
  }
}
