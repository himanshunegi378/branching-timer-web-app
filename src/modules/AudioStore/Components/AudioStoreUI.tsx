import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { useInjector } from '../../../contexts/InjectorContext';
import useDataStore from '../../../hooks/useDataStore';
import Modal from '../../../component/atoms/Modal';
import { AudioListItem } from '../../../component/molecules/AudioList';
import AudioStore, { AUDIO_STORE_KEY } from '../AudioStoreManager';
import AudioRecorder, { RECORD_TIME_KEY } from '../AudioRecorder';
import { ActionType } from '../../Actions/Actions';
import { DataStore } from '../../DataStore';
import RecordUI from './RecordUI';

// Define types
type RecordingState = 'idle' | 'recording' | 'nameSave';

const AudioStoreUI: React.FC = () => {
  // Hooks
  const injector = useInjector();
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);

  // Injected dependencies
  const dataStore = injector.get('dataStore') as DataStore<any>;
  const actions = injector.get('actions') as ActionType;
  const audioRecorder = injector.get('audioRecorder') as AudioRecorder;
  const audioStoreModule = injector.get('audioStore') as AudioStore;

  // Data from stores
  const isAudioStoreOpen = useDataStore(dataStore, 'audioStore/isOpen');
  const audioStore = useDataStore(audioStoreModule.dataStore, AUDIO_STORE_KEY);
  const recordTime = useDataStore(dataStore, RECORD_TIME_KEY);

  // Helper functions
  const startRecording = () => {
    setRecordingState('recording');
    audioRecorder.recordAudio();
  };

  const stopRecording = async () => {
    try {
      const blob = await audioRecorder.stopRecording();
      setRecordedAudio(blob);
      setRecordingState('nameSave');
    } catch (error) {
      console.error('Error stopping recording', error);
    }
  };

  const saveRecording = async ({ name }: { name: string }) => {
    if (recordedAudio) {
      try {
        await audioStoreModule.saveAudio(recordedAudio, { name });
      } catch (error) {
        console.error('Error saving audio', error);
      }
    }
    setRecordingState('idle');
  };

  return (
    <Modal
      isOpen={isAudioStoreOpen}
      onClose={() => actions.invoke('audioStore/close', 0)}
      className='h-5/6'
    >
      <AnimatePresence>
        <motion.div
          layout
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className='p-6 flex flex-col h-full'
        >
          <h2 className='text-3xl font-bold mb-6'>Audio Store</h2>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            layout
            transition={{ duration: 0.2 }}
            className='mb-6 bg-white rounded-lg'
          >
            <RecordUI
              recordingState={recordingState}
              startRecording={startRecording}
              stopRecording={stopRecording}
              saveRecording={saveRecording}
              recordTime={recordTime}
            />
          </motion.div>
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='overflow-y-auto flex-1 border border-gray-200 rounded-lg bg-gray-50 p-4'
          >
            {Object.keys(audioStore).length === 0 ? (
              <p className='text-center text-gray-500 py-8'>
                No audio files found.
              </p>
            ) : (
              <AnimatePresence>
                {Object.keys(audioStore).map((id, index) => {
                  const { meta, blob } = audioStore[id];
                  return (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      layout
                    >
                      <AudioListItem
                        name={meta.name}
                        blob={blob}
                        onDelete={() => audioStoreModule.deleteAudio(id)}
                        className={index > 0 ? 'mt-4' : undefined}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
};
export default AudioStoreUI;
