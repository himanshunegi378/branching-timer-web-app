import { useState } from "react";
import { v1 as uuidv1 } from "uuid";
import { localStorage } from "../utils/localStorage";

export type Timer = { id: string; name: string; time: number };
export type TimerStore = {
  [id: string]: Timer;
};

export default function useTimerStore() {
  const [timerStore, setTimerStore] = useState<TimerStore>({});

  const createTimer = (name: string, time: number): Timer => {
    const id = uuidv1();
    return { id: id, name: name, time: time };
  };

  function addTimer(name: string, time: number): Timer {
    const newTimer = createTimer(name, time);
    setTimerStore({ ...timerStore, [newTimer.id]: newTimer });
    saveTimerToStorage(newTimer);
    return newTimer;
  }
  function getTimer(id: string): Timer {
    const timer = timerStore[id];
    return timer;
  }
  function deleteTimer(id: string) {
    const newTimerStore = { ...timerStore };
    delete newTimerStore[id];
    deleteTimeFromStorage(id);
    setTimerStore(newTimerStore);
  }

  async function loadTimerFromStorage(id: string) {
    const timer = await localStorage.getItem<Timer>(id);
    if (!timer) return null;
    return timer;
  }

  function saveTimerToStorage(timer: Timer) {
    localStorage.setItem(timer.id, timer);
  }

  function deleteTimeFromStorage(id: string) {
    localStorage.removeItem(id);
  }

  async function init(timerIdList: string[]) {
    const timerStore: TimerStore = {};
    const promises: any[] = [];
    timerIdList.forEach((id) => {
      promises.push(
        loadTimerFromStorage(id).then((timer) => {
          if (timer) timerStore[id] = timer;
        })
      );
    });
    await Promise.all(promises);
    setTimerStore(timerStore);
    return timerStore;
  }

  function updateTimer(id: string, opts: { name?: string; time?: number }) {
    const newTimerStore = { ...timerStore };
    newTimerStore[id].name = opts.name || newTimerStore[id].name;
    newTimerStore[id].time = opts.time || newTimerStore[id].time;
    saveTimerToStorage(newTimerStore[id]);
    setTimerStore(newTimerStore);
  }

  return {
    init,
    addTimer,
    getTimer,
    deleteTimer,
    updateTimer,
    timerStore,
  };
}
