import { Event } from './Event';

type Component = React.ComponentType;

export class ComponentRegistry {
  static $inject = ['eventBus'];
  private components: { [key: string]: Record<string, Component> };
  private cachedComponents: { [key: string]: Component[] } = {};
  private eventBus: Event;

  constructor(eventBus: Event) {
    this.eventBus = eventBus;
    this.components = {};
  }

  // Register a component with a specific key
  register(key: string, id: string, component: Component): void {
    // Initialize the key if it doesn't exist
    if (!this.components[key]) {
      this.components[key] = {};
    }
    // Push the new component into the record for the key
    this.components[key][id] = component;
    delete this.cachedComponents[key];
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

    if (!this.cachedComponents[key]) {
      this.cachedComponents[key] = Object.values(comps).map((comp) => comp);
    }
    return this.cachedComponents[key];
  }

  // Optional: Deregister a specific component by key
  deregister(key: string, id?: string): void {
    if (this.components[key]) {
      if (!id) {
        this.components[key] = {};
        delete this.cachedComponents[key];
        this.eventBus.emit(`componentRegistry/deRegistered/${key}`);
        return;
      }
      // Find the index of the component to remove
      delete this.components[key][id];
      delete this.cachedComponents[key];
      this.eventBus.emit(`componentRegistry/deRegistered/${key}`, id);
    } else {
      console.warn(
        `Trying to deregister a component from a key that doesn't exist: ${key}`
      );
    }
  }
}
