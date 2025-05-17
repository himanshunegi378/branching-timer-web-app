// ScriptStore.ts
import { localStorage } from '../../utils/localStorage';
import { DataStore } from '../DataStore';

export type Script = {
  id: string;
  name: string;
  script: string;
};

interface ScriptRepository {
  getScripts(): Promise<Script[]>;
  getScript(id: string): Promise<Script | undefined>;
  updateScript(id: string, updatedScript: Script): Promise<void>;
  deleteScript(id: string): Promise<void>;
}

class ScriptStore implements ScriptRepository {
  private readonly dataStore: DataStore<any>;
  private readonly localStoragePersist: ScriptStoreLocalStoragePersist;

  constructor(
    dataStore: DataStore<any>,
    localStoragePersist: ScriptStoreLocalStoragePersist
  ) {
    this.dataStore = dataStore;
    this.localStoragePersist = localStoragePersist;
  }

  async getScripts(): Promise<Script[]> {
    const storedScripts = await this.dataStore.getData('customScript');
    return Object.values(storedScripts) || [];
  }

  async getScript(id: string): Promise<Script | undefined> {
    const scripts = await this.dataStore.getData('customScript');
    return scripts && scripts[id];
  }

  async updateScript(id: string, updatedScript: Script): Promise<void> {
    this.dataStore.setProduceData(
      (draft: Record<string, Record<string, Script>>) => {
        if (draft['customScript']) {
          draft['customScript'][id] = updatedScript;
        }
      }
    );
    await this.localStoragePersist.updateScript(updatedScript);
  }

  async deleteScript(id: string): Promise<void> {
    this.dataStore.setProduceData(
      (draft: Record<string, Record<string, Script>>) => {
        if (draft['customScript']) {
          delete draft['customScript'][id];
        }
      }
    );
    await this.localStoragePersist.deleteScript(id);
  }
}

class ScriptStoreLocalStoragePersist {
  async updateScript(script: Script): Promise<void> {
    await localStorage.setItem(`script/customScript_${script.id}`, script);
    await this.updateScriptsList();
  }

  async deleteScript(id: string): Promise<void> {
    await localStorage.removeItem(`script/customScript_${id}`);
    await this.updateScriptsList();
  }

  private async updateScriptsList(): Promise<void> {
    const allScripts = await this.loadFromStorage();
    await localStorage.setItem('scripts/list', Object.keys(allScripts));
  }

  private async loadFromStorage(): Promise<Script[]> {
    const scriptsKey = (await localStorage.getItem('scripts/list')) as
      | string[]
      | null;
    if (!scriptsKey) {
      return [];
    }
    const scripts = await Promise.all(
      scriptsKey.map(async (key) => {
        const script = await localStorage.getItem<Script>(
          `script/customScript_${key}`
        );
        if (!script) {
          return null;
        }
        return script;
      })
    );
    const allScripts = scripts.filter(Boolean) as Script[];
    return allScripts;
  }
}

export { ScriptStore, ScriptStoreLocalStoragePersist };
