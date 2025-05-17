import { useRef, useEffect, useCallback, useReducer } from 'react';
import { PlayIcon } from '../PlayButton/PlayButton.component';
import { StopIcon } from '../StopButton/StopButton.component';

interface AudioElapsedData {
  currentTime: number;
  totalTime: number;
}

interface AudioPlayButtonProps {
  /** URL of the audio file to play */
  url: string;
  /** Callback triggered when audio starts playing */
  onPlay?: () => void;
  /** Callback triggered when audio is stopped */
  onStop?: () => void;
  /** Callback triggered when playback time changes */
  onElapsedChange?: (elapsed: AudioElapsedData) => void;
}

type AudioState = {
  isPlaying: boolean;
  error: string | null;
};

type AudioAction =
  | { type: 'PLAY_AUDIO' }
  | { type: 'STOP_AUDIO' }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: AudioState = {
  isPlaying: false,
  error: null,
};

const audioReducer = (state: AudioState, action: AudioAction): AudioState => {
  switch (action.type) {
    case 'PLAY_AUDIO':
      return { ...state, isPlaying: true, error: null };
    case 'STOP_AUDIO':
      return { ...state, isPlaying: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isPlaying: false };
    default:
      return state;
  }
};

export function AudioPlayButton({
  url,
  onPlay,
  onStop,
  onElapsedChange,
}: Readonly<AudioPlayButtonProps>) {
  const [state, dispatch] = useReducer(audioReducer, initialState);
  const { isPlaying, error } = state;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleError = useCallback((error?: Event) => {
    console.error(error);
    dispatch({ type: 'SET_ERROR', payload: 'An error occurred while playing the audio' });
  }, []);

  const playAudioCallback = useCallback(async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      dispatch({ type: 'PLAY_AUDIO' });
      onPlay?.();
    } catch (err) {
      handleError();
    }
  }, [onPlay, handleError]);

  const stopAudioCallback = useCallback(() => {
    if (!audioRef.current) return;
    try {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      dispatch({ type: 'STOP_AUDIO' });
      onStop?.();
    } catch (err) {
      handleError();
    }
  }, [onStop, handleError]);

  const toggle = useCallback(() => {
    isPlaying ? stopAudioCallback() : playAudioCallback();
  }, [isPlaying, playAudioCallback, stopAudioCallback]);

  useEffect(() => {
    audioRef.current = new Audio(url);

    const audio = audioRef.current;
    if (!audio) return;

    const handlers = {
      ended: stopAudioCallback,
      timeupdate: () => {
        onElapsedChange?.({
          currentTime: audio.currentTime,
          totalTime: audio.duration,
        });
      },
      error: (e: Event) => handleError(e),
    };

    Object.entries(handlers).forEach(([event, handler]) => {
      audio.addEventListener(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        audio.removeEventListener(event, handler);
      });
      audio.pause();
      audioRef.current = null;
    };
  }, [url, stopAudioCallback, onElapsedChange, handleError]);

  return (
    <div className='flex items-center gap-2'>
      <button 
        type='button' 
        onClick={toggle}
        disabled={!!error}
        aria-label={isPlaying ? 'Stop' : 'Play'}
      >
        {isPlaying ? <StopIcon enabled={true} /> : <PlayIcon enabled={!error} />}
      </button>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
