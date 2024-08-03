import { Event } from './Event';

type Component = React.ComponentType;

export class ComponentRegistry {
  private components: { [key: string]: Record<string, Component> };
  private eventBus: Event;

  constructor(eventBus: Event) {
    this.eventBus = eventBus;
    this.components = {};
  }

  // Register a component with a specific key
  register(key: string, id: string, component: Component): void {
    // Initialize the key with an empty array if it doesn't exist
    if (!this.components[key]) {
      this.components[key] = {};
    }
    // Push the new component into the array for the key
    this.components[key][id] = component;
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
    return Object.values(comps).map((comp) => comp);
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
      this.eventBus.emit(`componentRegistry/deRegistered/${key}`, id);
    } else {
      console.warn(
        `Trying to deregister a component from a key that doesn't exist: ${key}`
      );
    }
  }
}

// @ts-ignore
ComponentRegistry.$inject = ['eventBus'];
