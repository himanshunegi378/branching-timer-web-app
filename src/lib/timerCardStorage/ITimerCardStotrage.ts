import { TimerCard } from "../../contexts/TimerCards/TimerCards.types";

export interface ITimerCardStorage {
  save: (timerCardData: TimerCard) => Promise<Boolean>;
  load: (timerCardId: string) => Promise<TimerCard | null>;
  delete: (timerCardId: string) => Promise<Boolean>;
}
