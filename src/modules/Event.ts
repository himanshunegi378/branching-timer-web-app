type ChangeListener = (...args: unknown[]) => void;

export class Event {
  private listeners: Record<string, ChangeListener[]> = {};

  emit(event: string, ...args: unknown[]): void {
    this.notifyListeners(event, ...args);
  }


  on(event: string, listener: ChangeListener): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  off(key: string, listener: ChangeListener): void {
    const listeners = this.listeners[key];
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }

  removeAllListenersForEvent(key: string): void {
    if (this.listeners[key]) {
      delete this.listeners[key];
    }
  }

  // Add method to remove all listeners for all keys
  removeAllListeners(): void {
    for (const key in this.listeners) {
      delete this.listeners[key];
    }
  }

  private notifyListeners(key: string, ...args: unknown[]): void {
    const listeners = this.listeners[key];
    if (listeners) {
      for (const listener of listeners) {
        listener(...args);
      }
    }
  }
}
