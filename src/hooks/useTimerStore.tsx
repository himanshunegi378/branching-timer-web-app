import { useRef, useState } from "react";
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
    saveTimer(newTimer);
    return newTimer;
  }
  function getTimer(id: string): Timer {
    const timer = timerStore[id];
    return timer;
  }
  function deleteTimer(id: string) {
    const newTimerStore = { ...timerStore };
    delete newTimerStore[id];
    localStorage.removeItem(id);
    setTimerStore(newTimerStore);
  }

  function loadTimer(id: string) {
    const timer = localStorage.getItem<Timer>(id);
    if (!timer) return null;
    return timer;
  }

  function saveTimer(timer: Timer) {
    localStorage.setItem(timer.id, timer);
  }

  function init(idList: string[]) {
    const timerStore: TimerStore = {};
    idList.forEach((id) => {
      const timer = loadTimer(id);
      if (timer) timerStore[id] = timer;
    });
    setTimerStore(timerStore);
  }

  function updateTimer(id: string, opts: any) {
    const newTimerStore = { ...timerStore };
    newTimerStore[id].name = opts.name || newTimerStore[id].name;
    newTimerStore[id].time = opts.time || newTimerStore[id].time;
    saveTimer(newTimerStore[id]);
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
