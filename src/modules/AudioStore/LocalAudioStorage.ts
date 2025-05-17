import { localStorage } from '../../utils/localStorage';
import { AudioData, AudioMetadata } from './AudioStoreTypes';

interface AudioStorageError extends Error {
  code: 'NOT_FOUND' | 'STORAGE_FULL' | 'INVALID_DATA';
}

export class LocalAudioStorage {
  private readonly AUDIO_BLOB_KEY_PREFIX = 'audioStore/audioBlobs/';
  private readonly AUDIO_METADATA_KEY_PREFIX = 'audioStore/audioMetadata/';
  private readonly AUDIO_IDS_KEY = 'audioStore/audioIds';

  // #region Public API
  async updateAudioStore(
    audioId: string,
    audioBlob: Blob,
    audioMetadata: AudioMetadata
  ): Promise<void> {
    if (!audioId?.trim()) {
      throw this.createError('INVALID_DATA', 'Audio ID is required');
    }

    try {
      await this.saveAudioBlob(audioId, audioBlob);
      await this.saveAudioMetadata(audioId, audioMetadata);
      await this.addAudioId(audioId);
    } catch (error) {
      throw this.createError('STORAGE_FULL', 'Failed to update audio store');
    }
  }

  async removeAudioFromStore(audioId: string): Promise<void> {
    await this.removeAudioId(audioId);
    await this.removeAudioBlob(audioId);
    await this.removeAudioMetadata(audioId);
  }

  async getAudioData(audioId: string): Promise<AudioData> {
    const [audioBlob, audioMetadata] = await Promise.all([
      this.getAudioBlob(audioId),
      this.getAudioMetadata(audioId)
    ]);

    if (!audioBlob || !audioMetadata) {
      throw this.createError('NOT_FOUND', `Audio ${audioId} not found`);
    }

    return { blob: audioBlob, meta: audioMetadata, id: audioId };
  }

  async getAllAudioIds(): Promise<string[]> {
    return (await localStorage.getItem<string[]>(this.AUDIO_IDS_KEY)) || [];
  }
  // #endregion

  // #region Private Helpers
  private createError(code: AudioStorageError['code'], message: string): AudioStorageError {
    return Object.assign(new Error(message), { code });
  }

  private async validateStorage(): Promise<void> {
    try {
      const testKey = `${this.AUDIO_BLOB_KEY_PREFIX}test`;
      await localStorage.setItem(testKey, new Blob(['test']));
      await localStorage.removeItem(testKey);
    } catch (error) {
      throw this.createError('STORAGE_FULL', 'Local storage is full or unavailable');
    }
  }
  // #endregion

  private async getAudioBlob(audioId: string): Promise<Blob | null> {
    return localStorage.getItem<Blob>(this.AUDIO_BLOB_KEY_PREFIX + audioId);
  }

  private async getAudioMetadata(
    audioId: string
  ): Promise<AudioMetadata | null> {
    return localStorage.getItem<AudioMetadata>(
      this.AUDIO_METADATA_KEY_PREFIX + audioId
    );
  }

  private async saveAudioBlob(audioId: string, audioBlob: Blob): Promise<void> {
    await localStorage.setItem(this.AUDIO_BLOB_KEY_PREFIX + audioId, audioBlob);
  }

  private async saveAudioMetadata(
    audioId: string,
    audioMetadata: AudioMetadata
  ): Promise<void> {
    await localStorage.setItem(
      this.AUDIO_METADATA_KEY_PREFIX + audioId,
      audioMetadata
    );
  }

  private async addAudioId(audioId: string): Promise<void> {
    const audioIds = await this.getAllAudioIds();
    if (!audioIds.includes(audioId)) {
      audioIds.push(audioId);
      await localStorage.setItem(this.AUDIO_IDS_KEY, audioIds);
    }
  }

  private async removeAudioId(audioId: string): Promise<void> {
    const audioIds = await this.getAllAudioIds();
    const updatedAudioIds = audioIds.filter((id) => id !== audioId);
    await localStorage.setItem(this.AUDIO_IDS_KEY, updatedAudioIds);
  }

  private async removeAudioBlob(audioId: string): Promise<void> {
    await localStorage.removeItem(this.AUDIO_BLOB_KEY_PREFIX + audioId);
  }

  private async removeAudioMetadata(audioId: string): Promise<void> {
    await localStorage.removeItem(this.AUDIO_METADATA_KEY_PREFIX + audioId);
  }
}
