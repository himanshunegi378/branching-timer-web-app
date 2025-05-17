type ChangeListener = (...args: unknown[]) => void;

export class Event {
  private listeners: Record<string, ChangeListener[]> = {};
  private anyListeners: ChangeListener[] = [];

  emit(event: string, ...args: unknown[]): void {
    this.notifyListeners(event, ...args);
    this.notifyAnyListeners(event, ...args);
  }

  on(event: string, listener: ChangeListener): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  onAny(listener: any): void {
    this.anyListeners.push(listener);
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

  offAny(listener: ChangeListener): void {
    const index = this.anyListeners.indexOf(listener);
    if (index !== -1) {
      this.anyListeners.splice(index, 1);
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
    this.anyListeners = [];
  }

  private notifyListeners(key: string, ...args: unknown[]): void {
    const listeners = this.listeners[key];
    if (listeners) {
      for (const listener of listeners) {
        listener(...args);
      }
    }
  }

  private notifyAnyListeners(...args: unknown[]): void {
    const [eventName, ...rest] = args;
    for (const listener of this.anyListeners) {
      listener(eventName, rest);
    }
  }
}
