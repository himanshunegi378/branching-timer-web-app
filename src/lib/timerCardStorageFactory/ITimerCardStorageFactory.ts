import { ITimerCardStorage } from "../timerCardStorage/ITimerCardStotrage";

export interface ITimerCardStorageFactory {
  createTimerCardStorage: () => ITimerCardStorage;
}
