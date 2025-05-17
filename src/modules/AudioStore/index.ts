import AudioRecorder from './AudioRecorder';
import AudioStore from './AudioStoreManager';
import AudioStoreUIModule from './AudioStoreUIModule';

const audioStoreModule = {
  __init__: ['audioStore', 'audioRecorder', 'audioStoreUI'],
  __depends__: ['eventBus', 'actions', 'navbar', 'componentRegistry'],
  audioStoreUI: ['type', AudioStoreUIModule],
  audioStore: ['type', AudioStore],
  audioRecorder: ['type', AudioRecorder],
};

export default audioStoreModule;
