import { useCallback, useEffect, useRef, useState } from "react";
import CountdownTimer from "../lib/countdownTimer";
import showNotification from "../utils/notification";
import useSoundPlayer from "./useSoundPlayer";
import useTimerGroup from "./useTimerGroup";
//@ts-ignore
import defaultSound from "./alarm.mp3";
import { localStorage } from "../utils/localStorage";

export default function useTimerCard(id: string, name = "Unnamed") {
  const { timerGroupStore, timerStore, ...timerGroup } = useTimerGroup(
    id,
    name
  );
  const [timerCardData, setTimerCardData] = useState({
    looping: false,
    status: "stopped",
    alarmSound: {},
  });
  const [runningTimer, setRunningTimer] = useState({
    currentTimerId: "",
    remainingTime: 0,
    time: 0,
  });
  const countdownTimerRef = useRef(new CountdownTimer());
  const [onTimerFinished, setOnTimerFinished] = useState(false); //everytime var change it value from false to true next timer is played if constraints satisfied
  const runningTimerRef = useRef(runningTimer); //only used for purpose of storing data to save it later in localstorage
  const timerCardDataRef = useRef(timerCardData); //only used when storing data to local storage
  const customSoundsRef = useRef<{ [timerId in string]: Blob[] }>({});
  const { play, pause, stop } = useSoundPlayer();
  //to save running timer data before it is closed
  useEffect(() => {
    if (!id) return;
    const onPageHide = async () => {
      await localStorage.setItem(
        "runningTimerData" + id,
        runningTimerRef.current
      );
      await localStorage.setItem(
        "timerCardData" + id,
        timerCardDataRef.current
      );
      console.log(customSoundsRef.current);
      await localStorage.setItem("customSound" + id, customSoundsRef.current);
    };
    window.addEventListener("beforeunload", onPageHide);
    return () => {
      window.removeEventListener("beforeunload", onPageHide);
    };
  }, [id]);

  useEffect(() => {
    const onTick = (remainingTime: number) => {
      setRunningTimer(({ ...runningTimerData }): any => {
        const newData = { ...runningTimerData, remainingTime: remainingTime };
        return newData;
      });
    };
    const countdownTimer = countdownTimerRef.current;
    countdownTimer.on("tick", onTick);

    return () => {
      countdownTimer.off("tick", onTick);
    };
  }, []);

  useEffect(() => {
    runningTimerRef.current = runningTimer;
  }, [runningTimer]);

  useEffect(() => {
    timerCardDataRef.current = {
      ...timerCardData,
      status: timerCardData.status === "stopped" ? "stopped" : "paused",
    };
  }, [timerCardData]);

  useEffect(() => {
    if (!onTimerFinished) return;

    const timerList = timerGroupStore.timers;
    const indexofFinishedTimer = timerList.indexOf(runningTimer.currentTimerId);
    let nextTimer = timerStore[timerList[indexofFinishedTimer + 1]];
    //to check wheter last timer
    if (!nextTimer) {
      //if looping is disabled change status to stopped and do noting
      if (timerCardData.looping === false) {
        setTimerCardData({ ...timerCardData, status: "stopped" });
        setRunningTimer({
          ...runningTimer,
          remainingTime: 0,
          currentTimerId: "",
        });
        setOnTimerFinished(false);
        return;
      }

      //get the first timer and set it as running timer
      nextTimer = timerStore[timerList[0]];

      setRunningTimer({
        currentTimerId: nextTimer.id,
        remainingTime: nextTimer.time,
        time: nextTimer.time,
      });
    }
    setRunningTimer({
      currentTimerId: nextTimer.id,
      remainingTime: nextTimer.time,
      time: nextTimer.time,
    });

    playCard(nextTimer.id);
    setOnTimerFinished(false);

    return () => {};
  }, [onTimerFinished]);

  const loadTimerCardDataFromStorage = useCallback(async () => {
    return await localStorage.getItem("timerCardData" + id);
  }, [id]);

  const loadRunningTimerDataFromStorage = useCallback(async () => {
    return await localStorage.getItem("runningTimerData" + id);
  }, [id]);

  const loadCustomSoundFromStorage = async () => {
    return await localStorage.getItem("customSound" + id);
  };

  const initTimerCard = useCallback(async () => {
    const parsedTimerCardData = await loadTimerCardDataFromStorage();
    if (parsedTimerCardData) {
      //@ts-ignore
      setTimerCardData(parsedTimerCardData);
    }

    const parsedRunningTimerData = await loadRunningTimerDataFromStorage();
    if (parsedRunningTimerData) {
      //@ts-ignore
      setRunningTimer(parsedRunningTimerData);
    }

    const customSoundData = await loadCustomSoundFromStorage();
    if (customSoundData) {
      customSoundsRef.current = customSoundData as {
        [x: string]: Blob[];
      };
    }
  }, [loadRunningTimerDataFromStorage, loadTimerCardDataFromStorage]);

  useEffect(() => {
    initTimerCard();
  }, [initTimerCard]);

  const playCard = (currentTimerId = "") => {
    currentTimerId =
      currentTimerId || ((runningTimer.currentTimerId as unknown) as string);

    //no currentTimerid might mean its first time playing
    if (!currentTimerId) {
      currentTimerId = timerGroupStore.timers[0] as string;
      //if index 0 does not have current timer id it means card does not have timer hence do nothing
      if (!currentTimerId) return;
    }
    const timerData = timerStore[currentTimerId];
    //in off chance if currenttimerId is invalid do nothing
    if (!timerData) return;

    setRunningTimer({ ...runningTimer, currentTimerId: currentTimerId });
    countdownTimerRef.current.off("finished");
    if (timerCardData.status === "paused") {
      countdownTimerRef.current.play(runningTimer.remainingTime);
    } else {
      countdownTimerRef.current.play(timerData.time);
    }
    setTimerCardData({ ...timerCardData, status: "playing" });

    countdownTimerRef.current.on("finished", () => {
      showNotification(
        `${timerGroupStore.name} => ${timerData.name} | completed`
      );

      if (customSoundsRef.current[timerData.id]) {
        const soundObjectUrl = URL.createObjectURL(
          customSoundsRef.current[timerData.id]
        );
        play(soundObjectUrl);
      } else {
        play(defaultSound, 2);
      }

      setOnTimerFinished(true);
    });
  };

  const pausecard = () => {
    setTimerCardData({ ...timerCardData, status: "paused" });
    countdownTimerRef.current.stop();
  };

  const stopCard = () => {
    countdownTimerRef.current.stop();
    setTimerCardData({ ...timerCardData, status: "stopped" });
    setRunningTimer({ ...runningTimer, remainingTime: 0, currentTimerId: "" });
  };

  const toggleLooping = () => {
    const newTimerCardData = {
      ...timerCardData,
      looping: !timerCardData.looping,
    };
    setTimerCardData(newTimerCardData);
    localStorage.setItem("timerCardData" + id, newTimerCardData);
  };

  const deleteTimerCard = () => {
    timerGroup.deleteTimerGroup();
    localStorage.removeItem("runningTimerData" + id);
    localStorage.removeItem("timerCardData" + id);
  };

  const addTimer = (name: string, time: number) => {
    timerGroup.addTimerInGroup(name, time);
  };

  const removeTimer = (timerId: string) => {
    timerGroup.deleteTimerFromGroup(timerId);
  };

  const addSound = (timerId: string, audioBlob: Blob[]) => {
    customSoundsRef.current[timerId] = audioBlob;
  };

  const changeTimerCardName = (newName: string) => {
    timerGroup.changeGroupName(newName);
  };
  const changeTimerName = (timerId: string, newName: string) => {
    timerGroup.updateTimer(timerId, { name: newName });
  };
  const chanageTimerTime = (timerId: string, newTime: number) => {
    timerGroup.updateTimer(timerId, { time: newTime });
  };

  return {
    addSound,
    addTimer,
    changeTimerCardName,
    removeTimer,
    chanageTimerTime,
    changeTimerName,
    deleteTimerCard,
    playCard,
    pausecard,
    stopCard,
    toggleLooping,
    timerStore,
    timerCardData: { ...timerGroupStore, ...timerCardData },
    runningTimer,
  };
}
