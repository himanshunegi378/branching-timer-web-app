import { TimerCardLocalStorage } from "../timerCardStorage/TimerCardLocalStorage";
import { ITimerCardStorageFactory } from "./ITimerCardStorageFactory";

export class TimerCardLocalStorageFactory implements ITimerCardStorageFactory {
  createTimerCardStorage = () => {
    //todo
    return new TimerCardLocalStorage();
  };
}
