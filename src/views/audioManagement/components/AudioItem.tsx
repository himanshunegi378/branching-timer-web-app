import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faClose,
  faStop,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

type AudioItemProps = {
  audioFile: File;
  onRemove: (audioFile: File) => void;
};

export function AudioItem({ audioFile, onRemove }: AudioItemProps) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement || !audioFile) return;
    const audioUrl = URL.createObjectURL(audioFile);
    audioElement.src = audioUrl;
    return () => URL.revokeObjectURL(audioUrl);
  }, [audioFile]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.play();
    } else if (!playing) {
      audioRef.current.pause();
    }
  }, [playing]);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className='flex justify-start p-2'
      >
        <div className='flex items-center mr-2'>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPlaying(!playing)}
          >
            <AnimatePresence mode='popLayout'>
              {playing && (
                <motion.svg
                  key='pause'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='w-6 h-6'
                  viewBox='0 0 448 512'
                >
                  <FontAwesomeIcon icon={faPause} />
                </motion.svg>
              )}
              {!playing && (
                <motion.svg
                  key='play'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='w-6 h-6'
                  viewBox='0 0 512 512'
                >
                  <FontAwesomeIcon icon={faPlay} />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
        <AnimatePresence>
          {playing && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className='mr-2'
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPlaying(false);
                  const audioElement = audioRef.current;
                  if (!audioElement) return;
                  audioElement.pause();
                  audioElement.currentTime = 0;
                }}
              >
                <FontAwesomeIcon icon={faStop} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div layout className='flex-grow'>
          {audioFile.name}
        </motion.div>
        <div className='ml-2'>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onRemove(audioFile)}
          >
            <FontAwesomeIcon icon={faClose} />
          </motion.button>
        </div>
        <audio className='hidden' ref={audioRef} controls autoPlay={false} />
      </motion.div>
    </>
  );
}
