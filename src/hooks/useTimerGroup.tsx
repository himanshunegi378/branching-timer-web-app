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
    loadTimerGroupFromLocalStorage(id).then((savedTimerGroupStoreData) => {
      if (!savedTimerGroupStoreData) return;
      const timersList = savedTimerGroupStoreData.timers;

      init(timersList).then(() => {
        setTimerGroupStore(savedTimerGroupStoreData);
      });
    });
  }, [id]);

  const saveTimerGroupToLocalStorage = (timerGroup: TimerGroupStore) => {
    localStorage.setItem(timerGroup.id, timerGroup);
  };

  const deleteTimerGroupFromLocalStorage = (timerGroup: TimerGroupStore) => {
    localStorage.removeItem(timerGroup.id);
  };

  const loadTimerGroupFromLocalStorage = async (
    id: string
  ): Promise<TimerGroupStore | null> => {
    const timerGroup = await localStorage.getItem<TimerGroupStore>(id);
    return timerGroup;
  };

  function addTimerInGroup(name: string, time: number) {
    const newTimer = addTimer(name, time);
    const newTimerGroups: TimerGroupStore = { ...timerGroupStore };
    newTimerGroups.timers.push(newTimer.id);
    saveTimerGroupToLocalStorage(newTimerGroups);
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
    saveTimerGroupToLocalStorage(newTimerGroupsStore);
    setTimerGroupStore(newTimerGroupsStore);
    return newTimerGroupsStore;
  }

  function deleteTimerGroup() {
    const timersList = timerGroupStore.timers;
    timersList.forEach((timerId: string) => {
      deleteTimer(timerId);
    });
    deleteTimerGroupFromLocalStorage(timerGroupStore);
  }

  function changeGroupName(newName: string) {
    if (!newName) return;
    setTimerGroupStore({ ...timerGroupStore, name: newName });
    saveTimerGroupToLocalStorage({
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
