import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../../component/atoms/Button/Button.atom';

// Define types for props
interface RecordUIProps {
  recordingState: 'idle' | 'recording' | 'nameSave';
  startRecording: () => void;
  stopRecording: () => void;
  saveRecording: (data: { name: string }) => void;
  recordTime: { startTime: number | null; currentTime: number | null };
}

const RecordUI: React.FC<RecordUIProps> = ({
  recordingState,
  startRecording,
  stopRecording,
  saveRecording,
  recordTime,
}) => {
  const formatRecordTime = (time: typeof recordTime): string => {
    if (!time || time.startTime === null || time.currentTime === null) {
      return '00:00';
    }

    const timeElapsed = time.currentTime - time.startTime;
    const minutes = Math.floor(timeElapsed / 60000);
    const seconds = ((timeElapsed % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  const variants = {
    idle: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    recording: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    nameSave: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <AnimatePresence mode='popLayout'>
      <motion.div
        key={recordingState}
        variants={variants}
        initial='idle'
        animate={recordingState}
        exit='idle'
        layout
        className='flex flex-col gap-2'
      >
        {recordingState === 'idle' && (
          <motion.div
            key={'idle'}
            layout
            initial={recordingState}
            animate={recordingState}
            variants={variants}
            className='flex flex-col w-full gap-2'
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <Button onClick={startRecording} className='w-full'>
              Start Recording
            </Button>
          </motion.div>
        )}
        {recordingState === 'recording' && (
          <motion.div
            layout
            key={'recording'}
            initial={recordingState}
            animate={recordingState}
            variants={variants}
            className='flex flex-col w-full gap-2'
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <Button
              onClick={stopRecording}
              className='w-full'
              color='secondary'
            >
              Stop Recording ({formatRecordTime(recordTime)})
            </Button>
          </motion.div>
        )}
        {recordingState === 'nameSave' && (
          <motion.div
            layout
            key={'nameSave'}
            initial={recordingState}
            animate={recordingState}
            variants={variants}
            className='flex flex-col w-full gap-2'
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <RecordingNameForm onSave={saveRecording} />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

interface RecordingNameFormProps {
  onSave: (data: { name: string }) => void;
}

const RecordingNameForm: React.FC<RecordingNameFormProps> = ({ onSave }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    onSave({ name });
  };

  return (
    <motion.form
      layout
      onSubmit={handleSubmit}
      className='w-full flex flex-col gap-2'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className='mb-2'>
        <label className='block mb-1' htmlFor='name'>
          Name
        </label>
        <input
          className='block w-full px-4 py-2 border rounded-md'
          type='text'
          name='name'
          id='name'
          required
        />
      </div>
      <div className='flex justify-end'>
        <Button
          type='submit'
          className='w-full'
        >
          Save
        </Button>
      </div>
    </motion.form>
  );
};

export default RecordUI;
