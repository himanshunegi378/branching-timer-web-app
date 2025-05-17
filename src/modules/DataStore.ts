import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { cloneDeep } from 'lodash';

type ChangeListener<T> = (key: string, newValue: T, oldValue: T | undefined) => void;
type ReactListener = () => void;

/**
 * A generic data store that supports change notifications and React integration
 */
export class DataStore<T> {
  private data: Record<string, T> = {};
  private listeners: Record<string, ChangeListener<T>[]> = {};
  private reactListeners: ReactListener[] = [];

  setData(key: string, value: T): T {
    const oldValue = this.data[key];
    this.data = produce(this.data, (draft: WritableDraft<Record<string, T>>) => {
      // @ts-ignore
      draft[key] = value;
    });

    this.notifyListeners(key, value, oldValue);
    this.emitChange();
    return value;
  }

  setProduceData(func: (arg0: WritableDraft<Record<string, T>>) => void) {
    this.data = produce(this.data, (draft) => {
      func(draft);
    });
    this.emitChange();
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

  /**
   * Subscribe to store changes (React integration)
   */
  subscribe = (listener: ReactListener): (() => void) => {
    this.reactListeners = [...this.reactListeners, listener];
    return () => {
      this.reactListeners = this.reactListeners.filter(l => l !== listener);
    };
  };

  getSnapshot = (): Record<string, T> => {
    return this.data;
  };

  private emitChange = (): void => {
    for (const listener of this.reactListeners) {
      listener();
    }
  };
}
