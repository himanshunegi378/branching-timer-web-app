import { MouseEvent } from 'react';

export type PlayButtonProps = {
  isPlaying: boolean;
  onChange: (isPlaying: boolean, event: MouseEvent<HTMLDivElement>) => void;
};
