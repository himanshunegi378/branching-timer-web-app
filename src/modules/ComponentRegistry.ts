import { Event } from './Event';

type Component = React.ComponentType;

export class ComponentRegistry {
  private components: { [key: string]: Record<string, Component> };
  private eventBus: Event;
  private dataStore: any;

  constructor(eventBus: Event, dataStore: any) {
    this.eventBus = eventBus;
    this.dataStore = dataStore;
    this.components = {};
  }

  // Register a component with a specific key
  register(
    key: string,
    id: string,
    component: Component,
    priority?: number
  ): void {
    // Initialize the key with an empty array if it doesn't exist
    if (!this.components[key]) {
      this.components[key] = {};
    }
    // Push the new component into the array for the key
    this.components[key][id] = component;
    // @ts-ignore
    component.priority = priority ?? 0;
    // sort the components by priority
    const components = Object.values(this.components[key]).sort((a, b) => {
      // @ts-ignore
      if (typeof a.priority === 'number' && typeof b.priority === 'number') {
        // @ts-ignore
        return a.priority - b.priority;
      }
      return 0;
    });
    this.dataStore.setData(`componentRegistry/${key}`, components);
    this.eventBus.emit(`componentRegistry/registered/${key}`, id, component);
  }

  // Retrieve components by key
  getComponents(key: string, id?: string): Component[] {
    if (!this.components[key]) {
      console.warn(`Components with key "${key}" not found.`);
      return [];
    }

    const comps = this.components[key];
    if (id) {
      return [comps[id]];
    }
    const allComponents = Object.values(comps).map((comp) => comp);
    allComponents.sort((a, b) => {
      // @ts-ignore
      if (a.priority && b.priority) {
        // @ts-ignore
        return a.priority - b.priority;
      }
      return 0;
    });
    return allComponents;
  }

  // Optional: Deregister a specific component by key
  deregister(key: string, id?: string): void {
    if (this.components[key]) {
      if (!id) {
        this.components[key] = {};
        this.eventBus.emit(`componentRegistry/deRegistered/${key}`);
        return;
      }
      // Find the index of the component to remove
      delete this.components[key][id];
      this.dataStore.setData(`componentRegistry/${key}`, this.components[key]);
      this.eventBus.emit(`componentRegistry/deRegistered/${key}`, id);
    } else {
      console.warn(
        `Trying to deregister a component from a key that doesn't exist: ${key}`
      );
    }
  }
}

// @ts-ignore
ComponentRegistry.$inject = ['eventBus', 'dataStore'];
