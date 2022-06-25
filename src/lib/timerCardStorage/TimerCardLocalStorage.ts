import { TimerCard } from "../../contexts/TimerCards/TimerCards.types";
import { localStorage } from "../../utils/localStorage";
import { ITimerCardStorage } from "./ITimerCardStotrage";

export class TimerCardLocalStorage implements ITimerCardStorage {
  save = async (timerCardData: TimerCard) => {
    try {
      localStorage.setItem(`timerCard_${timerCardData.id}`, timerCardData);
      return true;
    } catch (error) {
      return false;
    }
  };
  load = async (timerCardId: string) => {
    return localStorage.getItem<TimerCard>(`timerCard_${timerCardId}`);
  };

  delete = async (timerCardId: string) => {
    try {
      await localStorage.removeItem(`timerCard_${timerCardId}`);
      return true;
    } catch (error) {
      return false;
    }
  };
}
