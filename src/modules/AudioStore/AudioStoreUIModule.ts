import { Event } from '../Event';
import { ActionType } from '../Actions/Actions';
import AudioStoreUI from './Components/AudioStoreUI';

interface NavbarService {
  addItem(label: string, callback: () => void): void;
}

interface ComponentRegistry {
  register(section: string, name: string, component: unknown): void;
}

interface DataStore {
  getData<T>(key: string): T;
  setData<T>(key: string, value: T): void;
}

export default class AudioStoreUIModule {
  static $inject = [
    'eventBus',
    'actions',
    'navbar',
    'componentRegistry',
    'dataStore',
  ] as const;

  private static readonly STORE_KEY = {
    IS_OPEN: 'audioStore/isOpen',
  } as const;

  private static readonly EVENTS = {
    OPEN: 'audioStore/open',
    CLOSE: 'audioStore/close',
  } as const;

  constructor(
    private readonly eventBus: Event,
    private readonly actions: ActionType,
    private readonly navbar: NavbarService,
    private readonly componentRegistry: ComponentRegistry,
    private readonly dataStore: DataStore
  ) {
    this.initializeModule();
  }

  /**
   * Returns whether the audio store UI is currently open
   */
  public get isOpen(): boolean {
    return this.dataStore.getData<boolean>(
      AudioStoreUIModule.STORE_KEY.IS_OPEN
    );
  }

  /**
   * Opens the audio store UI and emits corresponding event
   */
  public openAudioStore(): void {
    this.dataStore.setData(AudioStoreUIModule.STORE_KEY.IS_OPEN, true);
    this.eventBus.emit(AudioStoreUIModule.EVENTS.OPEN);
  }

  /**
   * Closes the audio store UI and emits corresponding event
   */
  public closeAudioStore(): void {
    this.dataStore.setData(AudioStoreUIModule.STORE_KEY.IS_OPEN, false);
    this.eventBus.emit(AudioStoreUIModule.EVENTS.CLOSE);
  }

  private initializeModule(): void {
    this.dataStore.setData(AudioStoreUIModule.STORE_KEY.IS_OPEN, false);

    this.componentRegistry.register('board', 'audioStore', AudioStoreUI);
    this.navbar.addItem('AudioStore', () => {
      this.actions.invoke('audioStore/open', 0);
    });

    this.actions.register('audioStore/open', this.openAudioStore.bind(this));
    this.actions.register('audioStore/close', this.closeAudioStore.bind(this));
  }
}
