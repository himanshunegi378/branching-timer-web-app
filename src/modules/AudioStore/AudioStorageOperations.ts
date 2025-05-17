// src/modules/AudioStore/AudioStorageOperations.ts
import { DataStore } from '../DataStore';
import { AUDIO_STORE_KEY } from './AudioStoreManager';
import { AudioData, AudioMetadata, AudioStoreData } from './AudioStoreTypes';
import { LocalAudioStorage } from './LocalAudioStorage';

export class AudioStorageOperations {
  private localStorage: LocalAudioStorage;

  constructor(private _dataStore: DataStore<any>) {
    this.localStorage = new LocalAudioStorage();
    this.initializeStore();
  }

  private async initializeStore(): Promise<void> {
    const audioIds = await this.localStorage.getAllAudioIds();
    const audioStore: AudioStoreData = {};
    for (const id of audioIds) {
      const audioData = await this.localStorage.getAudioData(id);
      if (audioData) {
        audioStore[id] = audioData;
      }
    }
    this._dataStore.setData(AUDIO_STORE_KEY, audioStore);
  }

  async updateAudioStore(
    audioId: string,
    audioBlob: Blob,
    audioMetadata: AudioMetadata
  ): Promise<void> {
    await this.localStorage.updateAudioStore(audioId, audioBlob, audioMetadata);
    this._dataStore.setProduceData((draft: Record<string, AudioStoreData>) => {
      draft[AUDIO_STORE_KEY][audioId] = {
        blob: audioBlob,
        meta: audioMetadata,
        id: audioId,
      };
    });
  }

  async removeAudioFromStore(audioId: string): Promise<void> {
    await this.localStorage.removeAudioFromStore(audioId);
    this._dataStore.setProduceData((draft: Record<string, AudioStoreData>) => {
      const { [audioId]: _, ...rest } = draft[AUDIO_STORE_KEY];
      draft[AUDIO_STORE_KEY] = rest;
    });
  }

  async getAudioData(audioId: string): Promise<AudioData | undefined> {
    const audioStore = this._dataStore.getData(
      AUDIO_STORE_KEY
    ) as AudioStoreData;
    return (
      audioStore[audioId] || (await this.localStorage.getAudioData(audioId))
    );
  }
}
