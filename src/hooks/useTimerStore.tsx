import { useReducer, useState } from "react";
import { timer } from "rxjs";
import { v1 as uuidv1 } from "uuid";
import { localStorage } from "../utils/localStorage";

export type Timer = { id: string; name: string; time: number };
export type TimerStore = {
  [id: string]: Timer;
};

type Action =
  | { type: "ADD_TIMER"; payload: { id: string; name: string; time: number } }
  | { type: "DELETE_TIMER"; id: string }
  | {
      type: "UPDATE_TIMER";
      payload: { id: string; name: string; time: number };
    };

function timerStoreReducer(
  prevTimerStore: TimerStore,
  action: Action
): TimerStore {
  switch (action.type) {
    case "ADD_TIMER": {
      const { id, name, time } = action.payload;
      return { ...prevTimerStore, [id]: { id: id, name: name, time: time } };
    }
    case "DELETE_TIMER": {
      const newStore = { ...prevTimerStore };
      delete newStore[action.id];
      return newStore;
    }
    case "UPDATE_TIMER": {
      const { id, name, time } = action.payload;
      return { ...prevTimerStore, [id]: { id: id, name: name, time: time } };
    }
  }
}
export default function useTimerStore() {
  const [timerStore, dispatch] = useReducer(timerStoreReducer, {});

  // const [timerStore, setTimerStore] = useState<TimerStore>({});

  const createTimer = (name: string, time: number): Timer => {
    const id = uuidv1();
    return { id: id, name: name, time: time };
  };

  function addTimer(name: string, time: number): Timer {
    const newTimer = createTimer(name, time);
    dispatch({ type: "ADD_TIMER", payload: { ...newTimer } });
    saveTimerToStorage(newTimer);
    return newTimer;
  }
  function getTimer(id: string): Timer {
    const timer = timerStore[id];
    return timer;
  }
  function deleteTimer(id: string) {
    dispatch({ type: "DELETE_TIMER", id: id });
    deleteTimeFromStorage(id);
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
    const promises: any = [];
    const timerStore: TimerStore = {};
    timerIdList.forEach((id) => {
      promises.push(
        loadTimerFromStorage(id).then((timer) => {
          if (timer) timerStore[timer.id] = timer;
        })
      );
    });
    await Promise.all(promises);
    Object.values(timerStore).map((timer) =>
      dispatch({ type: "ADD_TIMER", payload: timer })
    );
    // dispatch({ type: "ADD_TIMER", payload: { ...timer } });
  }

  function updateTimer(id: string, opts: { name?: string; time?: number }) {
    const updatedTimer: Timer = {
      id: id,
      name: opts.name || timerStore[id].name,
      time: opts.time || timerStore[id].time,
    };
    dispatch({
      type: "UPDATE_TIMER",
      payload: updatedTimer,
    });
    saveTimerToStorage(updatedTimer);
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
