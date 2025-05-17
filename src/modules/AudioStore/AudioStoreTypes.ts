// src/modules/AudioStore/AudioStoreTypes.ts
export interface AudioMetadata {
    name: string;
    description?: string;
  }
  
  export interface AudioData {
    blob: Blob;
    meta: AudioMetadata;
    id: string;
  }
  
  export interface AudioStoreData {
    [key: string]: AudioData;
  }