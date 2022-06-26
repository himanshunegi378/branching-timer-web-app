export interface ITimerCardIdStorage {
  save: (timerCardIds: string[]) => Promise<Boolean>;
  load: () => Promise<string[] | null>;
  delete: () => Promise<Boolean>;
}
