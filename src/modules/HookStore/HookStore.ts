import { DataStore } from '../DataStore';

export class HookStore {
  dataStore: DataStore<unknown>;
  constructor(dataStore: DataStore<unknown>) {
    this.dataStore = dataStore;
  }

  addHook(key: string, hook: unknown) {
    this.dataStore.setData(`hookStore:${key}`, hook);
  }

  getHook(key: string) {
    return this.dataStore.getData(`hookStore:${key}`);
  }
}

// @ts-ignore
HookStore.$inject = ['dataStore'];
