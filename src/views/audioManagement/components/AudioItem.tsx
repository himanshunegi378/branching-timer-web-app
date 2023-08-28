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
      <div className='flex justify-start p-2'>
        <div className='flex items-center mr-2'>
          <button
            // className="border-2 border-gray-500 rounded-lg p-2"
            onClick={() => setPlaying(!playing)}
          >
            {playing ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </button>
        </div>
        {playing && (
          <div className='mr-2'>
            <button
              onClick={() => {
                setPlaying(false);
                const audioElement = audioRef.current;
                if (!audioElement) return;
                audioElement.pause();
                audioElement.currentTime = 0;
              }}
            >
              <FontAwesomeIcon icon={faStop} />
            </button>
          </div>
        )}
        <div>{audioFile.name}</div>
        <div className='ml-2'>
          <button
            // className="border-2 border-gray-500 rounded-lg p-2"
            onClick={() => onRemove(audioFile)}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
      </div>
      <audio className='hidden' ref={audioRef} controls autoPlay={false} />
    </>
  );
}
