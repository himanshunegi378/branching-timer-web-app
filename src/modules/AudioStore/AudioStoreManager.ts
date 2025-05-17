import { v4 } from 'uuid';
import { DataStore } from '../DataStore';
import { Event } from '../Event';
import { AudioStoreNotifications } from './AudioStoreNotifications';
import { AudioStorageOperations } from './AudioStorageOperations';
import { AudioData, AudioMetadata } from './AudioStoreTypes';

export const AUDIO_STORE_KEY = 'audioStore/audioStore';

export interface AudioStoreError extends Error {
  code:
    | 'INITIALIZATION_ERROR'
    | 'INVALID_INPUT'
    | 'NOT_FOUND'
    | 'STORAGE_ERROR';
}

export default class AudioStore {
  private readonly notifications: AudioStoreNotifications;
  private readonly storageOps: AudioStorageOperations;
  private initialized: boolean = false;

  static readonly $inject = ['eventBus', 'dataStore'] as const;

  constructor(
    private readonly eventBus: Event,
    public readonly dataStore: DataStore<Record<string, AudioData>>
  ) {
    this.notifications = new AudioStoreNotifications(eventBus);
    this.storageOps = new AudioStorageOperations(dataStore);
    this.initialize();
  }

  private initialize(): void {
    try {
      this.dataStore.setData(AUDIO_STORE_KEY, {});
      this.initialized = true;
    } catch (error) {
      throw this.createError(
        'INITIALIZATION_ERROR',
        'Failed to initialize AudioStore'
      );
    }
  }

  private createError(
    code: AudioStoreError['code'],
    message: string
  ): AudioStoreError {
    return Object.assign(new Error(message), { code });
  }

  private validateInitialization(): void {
    if (!this.initialized) {
      throw this.createError(
        'INITIALIZATION_ERROR',
        'AudioStore is not initialized'
      );
    }
  }

  private validateAudioMetadata(metadata: AudioMetadata): void {
    if (!metadata?.name?.trim()) {
      throw this.createError(
        'INVALID_INPUT',
        'Audio metadata must include a name'
      );
    }
  }

  async saveAudio(
    audioBlob: Blob,
    audioMetadata: AudioMetadata
  ): Promise<string> {
    this.validateInitialization();
    this.validateAudioMetadata(audioMetadata);

    if (!(audioBlob instanceof Blob)) {
      throw this.createError('INVALID_INPUT', 'Invalid audio blob');
    }

    try {
      const audioId = v4();
      await this.storageOps.updateAudioStore(audioId, audioBlob, audioMetadata);
      this.notifications.notifyAudioAdded(audioId, audioBlob, audioMetadata);
      return audioId;
    } catch (error) {
      throw this.createError('STORAGE_ERROR', 'Failed to save audio');
    }
  }

  async getAudio(audioId: string): Promise<AudioData> {
    this.validateInitialization();

    if (!audioId?.trim()) {
      throw this.createError('INVALID_INPUT', 'Audio ID is required');
    }

    const audioData = await this.storageOps.getAudioData(audioId);
    if (!audioData) {
      throw this.createError('NOT_FOUND', `Audio with ID ${audioId} not found`);
    }

    this.notifications.notifyAudioRetrieved(audioId, audioData);
    return audioData;
  }

  async deleteAudio(audioId: string): Promise<void> {
    this.validateInitialization();

    if (!audioId?.trim()) {
      throw this.createError('INVALID_INPUT', 'Audio ID is required');
    }

    try {
      const audioData = await this.getAudio(audioId);
      await this.storageOps.removeAudioFromStore(audioId);
      this.notifications.notifyAudioDeleted(audioId, audioData);
    } catch (error) {
      if ((error as AudioStoreError).code === 'NOT_FOUND') {
        return; // Silently ignore deletion of non-existent audio
      }
      throw error;
    }
  }
}
