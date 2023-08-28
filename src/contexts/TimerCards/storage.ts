import { localStorage } from '../../utils/localStorage';

export const timerCardIDsStorage = {
  save: (timercardIds: string[]) => {
    return localStorage.setItem(`timerCardIds`, timercardIds);
  },
  load: () => {
    return localStorage.getItem<string[]>(`timerCardIds`);
  },
  delete: () => {
    return localStorage.removeItem(`timerCardIds`);
  },
};
