import { MouseEvent } from 'react';

export type StopButtonProps = {
  isStopped: boolean;
  onChange: (isStopped: boolean, event: MouseEvent<HTMLDivElement>) => void;
};
