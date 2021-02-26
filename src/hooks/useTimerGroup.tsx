import { useEffect, useState } from "react";
import { localStorage } from "../utils/localStorage";
import useTimerStore from "./useTimerStore";

type TimerGroupStore = {
  id: string;
  name: string;
  timers: string[];
};

export default function useTimerGroup(id: string, name = "unname") {
  const [timerGroupStore, setTimerGroupStore] = useState<TimerGroupStore>({
    id: id,
    name: name,
    timers: [],
  });
  //   const [timerStore, setTimerStore] = useState<TimerStore>({});
  const {
    init,
    addTimer,
    getTimer,
    deleteTimer,
    updateTimer,
    timerStore,
  } = useTimerStore();

  //get localstorage data if any
  useEffect(() => {
    if (!id) return;
    const savedTimerGroupStoreData = localStorage.getItem<TimerGroupStore>(id);
    if (!savedTimerGroupStoreData) return;
    setTimerGroupStore(savedTimerGroupStoreData);

    const timersList = savedTimerGroupStoreData.timers;
    init(timersList);
  }, [id]);

  function addTimerInGroup(name: string, time: number) {
    const newTimer = addTimer(name, time);
    const newTimerGroups: TimerGroupStore = { ...timerGroupStore };
    newTimerGroups.timers.push(newTimer.id);
    localStorage.setItem(id, newTimerGroups);
    setTimerGroupStore(newTimerGroups);
    return newTimerGroups;
  }

  function deleteTimerFromGroup(timerId: string) {
    const newTimerGroupsStore = { ...timerGroupStore };
    const newTimerList = newTimerGroupsStore.timers.filter(
      (_timerId) => _timerId !== timerId
    );
    if (newTimerList.length !== newTimerGroupsStore.timers.length)
      deleteTimer(timerId);
    newTimerGroupsStore.timers = newTimerList;
    localStorage.setItem(newTimerGroupsStore.id, newTimerGroupsStore);
    setTimerGroupStore(newTimerGroupsStore);
    return newTimerGroupsStore;
  }

  function deleteTimerGroup() {
    const timersList = timerGroupStore.timers;
    timersList.forEach((timerId: string) => {
      deleteTimer(timerId);
    });
    localStorage.removeItem(id);
  }

  function changeGroupName(newName: string) {
    if (!newName) return;
    setTimerGroupStore({ ...timerGroupStore, name: newName });
    localStorage.setItem(timerGroupStore.id, {
      ...timerGroupStore,
      name: newName,
    });
  }

  return {
    addTimerInGroup,
    deleteTimerFromGroup,
    deleteTimerGroup,
    changeGroupName,
    timerGroupStore,
    updateTimer,
    getTimer,
    timerStore,
  };
}
