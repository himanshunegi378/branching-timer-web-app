import { useRef, useState } from "react";
import { timer } from "rxjs";
import { v1 as uuidv1 } from "uuid";
import { localStorage } from "../utils/localStorage";

type Timer = { id: string; name: string; time: number };
type TimerStore = {
  [id: string]: Timer;
};

export default function useTimerStore() {
  const [timerStore, setTimerStore] = useState<TimerStore>({});

  function addTimer(name: string, time: number): Timer {
    const id = uuidv1();
    const newTimer = { id: id, name: name, time: time };
    setTimerStore({ ...timerStore, [id]: newTimer });
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

  async function init(idList: string[]) {
    const timerStore: TimerStore = {};
    const promises: any[] = [];
    idList.forEach((id) => {
      promises.push(
        loadTimerFromStorage(id).then((timer) => {
          if (timer) timerStore[id] = timer;
        })
      );
    });
    await Promise.all(promises);
    setTimerStore(timerStore);
    return true;
  }

  function updateTimer(id: string, opts: any) {
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
