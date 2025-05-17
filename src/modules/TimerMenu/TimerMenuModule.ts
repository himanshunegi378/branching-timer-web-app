import { v4 } from 'uuid';
import { Event } from '../Event';
import TimerMenu from './component/TimerMenu';

export class TimerMenuModule {
  static $inject = ['eventBus', 'dataStore', 'componentRegistry', 'actions'];

  private eventBus: Event;
  private _dataStore: any;

  private componentRegistry: any;
  private actions: any;

  public readonly MENU_LIST_KEY = 'timerMenu/addItem';

  public get dataStore(): any {
    return this._dataStore;
  }
  constructor(
    eventBus: Event,
    dataStore: any,
    componentRegistry: any,
    actions: any
  ) {
    this.eventBus = eventBus;
    this._dataStore = dataStore;
    this.componentRegistry = componentRegistry;
    this.actions = actions;

    this.dataStore.setData(this.MENU_LIST_KEY, {});
    this.componentRegistry.register('menu', 'timerMenu', TimerMenu);
    this.actions.register(this.MENU_LIST_KEY, this.addItem.bind(this));
  }

  addItem(name: string, actionName: string) {
    this.dataStore.setProduceData((draft: { [x: string]: any }) => {
      const menuList = draft[this.MENU_LIST_KEY];
      menuList[name] = {
        label: name,
        id: v4(),
        action: actionName,
      };
    });
  }
}
