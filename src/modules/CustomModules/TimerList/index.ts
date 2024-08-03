import { TimerList } from './TimerList';

const TimerListModule = {
  __init__: ['timerList'],
  __depends__: ['timerCard'],
  timerList: ['type', TimerList],
};

export default TimerListModule;
