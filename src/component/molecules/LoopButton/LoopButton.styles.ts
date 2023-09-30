import { MouseEvent } from 'react';

export type LoopButtonProps = {
  looping: boolean;
  onChange: (looping: boolean, event: MouseEvent<HTMLDivElement>) => void;
};
