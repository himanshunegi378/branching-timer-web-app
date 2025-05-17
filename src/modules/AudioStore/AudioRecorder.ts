import { debounce, reject, throttle } from 'lodash';
import { ActionType } from '../Actions/Actions';
import { Event } from '../Event';
import { current } from 'immer';

export const IS_RECORDING_KEY = 'audioStore/isRecording';
export const RECORD_TIME_KEY = 'audioStore/recordTime';

export default class AudioRecorder {
  static $inject = [
    'eventBus',
    'actions',
    'navbar',
    'componentRegistry',
    'dataStore',
  ];

  private eventBus: Event;
  private actions: ActionType;
  private navbar: any;
  private componentRegistry: any;
  private dataStore: any;
  private mediaStream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private mediaChunks: Blob[] = [];

  constructor(
    eventBus: Event,
    actions: ActionType,
    navbar: unknown,
    componentRegistry: unknown,
    dataStore: any
  ) {
    this.eventBus = eventBus;
    this.actions = actions;
    this.navbar = navbar;
    this.componentRegistry = componentRegistry;
    this.dataStore = dataStore;
    this.dataStore.setData(IS_RECORDING_KEY, this.isRecording);
  }

  get isRecording() {
    return this.mediaRecorder && this.mediaRecorder?.state !== 'inactive';
  }

  async recordAudio() {
    const isRecording =
      this.mediaRecorder && this.mediaRecorder?.state !== 'inactive';

    if (isRecording) {
      this.stopRecording();
    }
    // get time elapsed for recording and emit it
    return new Promise<Blob>(async (resolve, reject) => {
      const startTime = Date.now();
      const debouncedSetData = throttle(this.dataStore.setData.bind(this.dataStore), 300, {
        leading: true,
      });
      try {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        this.mediaRecorder = new MediaRecorder(this.mediaStream, {
          mimeType: 'audio/webm',
        });
        const mediaChunks: Blob[] = [];
        this.mediaRecorder.addEventListener('dataavailable', (e) => {
          if (e.data.size > 0) {
            mediaChunks.push(e.data);
            this.mediaChunks = mediaChunks;
            debouncedSetData(RECORD_TIME_KEY, {
              startTime: startTime,
              currentTime: Date.now(),
            });
          }
        });

        this.mediaRecorder.addEventListener('stop', (e) => {
          if (!mediaChunks) return;
          this.dataStore.setData(RECORD_TIME_KEY, undefined);
          resolve(this.mediaChunksToBlob(mediaChunks));
        });
        this.dataStore.setData(IS_RECORDING_KEY, true);
        this.mediaRecorder.start(10);
      } catch (error) {
        this.stopRecording();
        reject(error);
      }
    });
  }

  stopRecording() {
    this.mediaRecorder?.stop();
    this.mediaStream?.getTracks().forEach((track) => track.stop());
    this.dataStore.setData(IS_RECORDING_KEY, false);
    return this.mediaChunksToBlob(this.mediaChunks);
  }

  mediaChunksToBlob(mediaChunks: Blob[]) {
    const [sampleChunk] = mediaChunks;
    return new Blob(mediaChunks, { type: sampleChunk.type });
  }
}
