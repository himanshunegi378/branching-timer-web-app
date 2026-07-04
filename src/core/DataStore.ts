type ChangeListener<T> = (
  key: string,
  newValue: T,
  oldValue: T | undefined
) => void;

export class DataStore<T> {
  private data: Record<string, T> = {};
  private listeners: Record<string, ChangeListener<T>[]> = {};

  setData(key: string, value: T): void {
    const oldValue = this.data[key];
    this.data[key] = value;

    if (oldValue !== value) {
      this.notifyListeners(key, value, oldValue);
    }
  }

  getData(key: string): T | undefined {
    return this.data[key];
  }

  addChangeListener(key: string, listener: ChangeListener<T>): void {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(listener);
  }

  removeChangeListener(key: string, listener: ChangeListener<T>): void {
    const listeners = this.listeners[key];
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }

  removeAllListenersForKey(key: string): void {
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

  private notifyListeners(
    key: string,
    newValue: T,
    oldValue: T | undefined
  ): void {
    const listeners = this.listeners[key];
    if (listeners) {
      for (const listener of listeners) {
        listener(key, newValue, oldValue);
      }
    }
  }
}
