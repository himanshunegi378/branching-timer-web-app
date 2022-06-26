import { timerCardStorageApi } from "../../api/timerCard";
import { TimerCard } from "../../contexts/TimerCards/TimerCards.types";
import { userType } from "../../types/user.types";
import { ITimerCardStorage } from "./ITimerCardStotrage";

export class TimerCardServerStorage implements ITimerCardStorage {
  private user: userType;
  constructor(user: userType) {
    this.user = user;
  }

  save = async (timerCardData: TimerCard) => {
    try {
      await timerCardStorageApi.save(this.user, timerCardData);
      // localStorage.setItem(`timerCard_${timerCardData.id}`, timerCardData);
      return true;
    } catch (error) {
      return false;
    }
  };
  load = async (timerCardId: string) => {
    return timerCardStorageApi.load(this.user, timerCardId);
    // return localStorage.getItem<TimerCard>(`timerCard_${timerCardId}`);
  };

  delete = async (timerCardId: string) => {
    try {
      await timerCardStorageApi.delete(this.user, timerCardId);
      return true;
    } catch (error) {
      return false;
    }
  };
}
