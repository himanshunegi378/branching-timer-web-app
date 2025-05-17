import { Event } from '../Event';
import { ComponentRegistry } from '../ComponentRegistry';
import { ActionType } from '../Actions/Actions';
import Navbar from './Navbar';
import { DataStore } from '../DataStore';

type NavbarItem = {
  name: string;
  onClick: () => void;
};

export default class NavbarModule {
  static $inject = ['eventBus', 'dataStore', 'componentRegistry', 'actions'];

  private eventBus: Event;
  private dataStore: DataStore<Array<NavbarItem>>;
  private componentRegistry: ComponentRegistry;

  private actions: ActionType;

  constructor(
    eventBus: Event,
    dataStore: DataStore<Array<NavbarItem>>,
    componentRegistry: ComponentRegistry,
    actions: ActionType
  ) {
    console.log('NavbarModule constructor');
    this.eventBus = eventBus;
    this.dataStore = dataStore;
    this.componentRegistry = componentRegistry;
    this.actions = actions;
    this.dataStore.setData('navbar/items', []);
    setTimeout(() => {
      this.componentRegistry.register('board', 'navbar', Navbar, -1);
    }, 2000);
    this.actions.register('navbar/addItem', this.addItem.bind(this));
  }

  get items() {
    return this.dataStore.getData('navbar/items') as Array<{
      name: string;
      onClick: () => void;
    }>;
  }

  set items(items: NavbarItem[]) {
    this.dataStore.setData('navbar/items', items);
  }

  addItem(name: string, onClick: () => void) {
    this.items = [...this.items, { name, onClick }];
    this.eventBus.emit('navbar/itemAdded', {
      name,
      onClick,
    });
  }
}
