import { TimerCardLocalStorage } from '../timerCardStorage/TimerCardLocalStorage';
import { ITimerCardStorageFactory } from './ITimerCardStorageFactory';

export class TimerCardLocalStorageFactory implements ITimerCardStorageFactory {
  createTimerCardStorage = () => {
    return new TimerCardLocalStorage();
  };
}
