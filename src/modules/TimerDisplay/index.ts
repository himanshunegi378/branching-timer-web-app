import { TimerDisplay } from './TimerDisplay';

const TimerDisplayModule = {
  __init__: ['timerDisplay'],
  __depends__: ['componentRegistry'],
  timerDisplay: ['type', TimerDisplay],
};

export default TimerDisplayModule;
