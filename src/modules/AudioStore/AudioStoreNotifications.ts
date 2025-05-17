// src/modules/AudioStore/AudioStoreNotifications.ts
import { Event } from '../Event';
import { AudioData, AudioMetadata } from './AudioStoreTypes';

export enum eventBusEventsKey {
  AUDIO_ADDED = 'audioStore/audioAdded',
  AUDIO_DELETED = 'audioStore/audioDeleted',
  AUDIO_GET = 'audioStore/audioGet',
}

export class AudioStoreNotifications {
  constructor(private eventBus: Event) {}

  notifyAudioAdded(
    audioId: string,
    audioBlob: Blob,
    audioMetadata: AudioMetadata
  ): void {
    this.eventBus.emit(eventBusEventsKey.AUDIO_ADDED, {
      id: audioId,
      blob: audioBlob,
      meta: audioMetadata,
    });
  }


  notifyAudioRetrieved(audioId: string, audioData: AudioData): void {
    this.eventBus.emit(eventBusEventsKey.AUDIO_GET, {
      ...audioData,
    });
  }

  notifyAudioDeleted(audioId: string, audioData: AudioData): void {
    this.eventBus.emit(eventBusEventsKey.AUDIO_DELETED, {
      ...audioData,
    });
  }
}