import { useEffect, useRef, useState } from "react";
import CountdownTimer from "../lib/countdownTimer";
import showNotification from "../utils/notification";
import useSoundPlayer from "./useSoundPlayer";
import useTimerGroup from "./useTimerGroup";
//@ts-ignore
import defaultSound from "./alarm.mp3";

export default function useTimerCard(id: string, name = "Unnamed") {
  const { ...timerGroup } = useTimerGroup(id, name);
  const [timerCardData, setTimerCardData] = useState({
    looping: false,
    status: "stopped",
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
  const { play, pause, stop } = useSoundPlayer();
  //to save running timer data before it is closed
  useEffect(() => {
    const onPageHide = () => {
      localStorage.setItem(
        "runningTimerData" + id,
        JSON.stringify(runningTimerRef.current)
      );
      localStorage.setItem(
        "timerCardData" + id,
        JSON.stringify(timerCardDataRef.current)
      );
    };
    window.addEventListener("pagehide", onPageHide);
    return () => {
      window.removeEventListener("pagehide", onPageHide);
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

    const timerList = timerGroup.timerGroupStore.timers;
    const indexofFinishedTimer = timerList.indexOf(runningTimer.currentTimerId);
    let nextTimer = timerGroup.timerStore[timerList[indexofFinishedTimer + 1]];
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
      nextTimer = timerGroup.timerStore[timerList[0]];

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

  useEffect(() => {
    const stringifiedTimerCardData = localStorage.getItem("timerCardData" + id);
    if (stringifiedTimerCardData) {
      const parsedTimerCardData = JSON.parse(stringifiedTimerCardData);
      setTimerCardData(parsedTimerCardData);
    }

    const stringifiedRunningTimerData = localStorage.getItem(
      "runningTimerData" + id
    );
    if (stringifiedRunningTimerData) {
      const parsedRunningTimerData = JSON.parse(stringifiedRunningTimerData);
      setRunningTimer(parsedRunningTimerData);
    }
  }, [id]);

  const playCard = (currentTimerId = "") => {
    currentTimerId =
      currentTimerId || ((runningTimer.currentTimerId as unknown) as string);

    //no currentTimerid might mean its first time playing
    if (!currentTimerId) {
      currentTimerId = timerGroup.timerGroupStore.timers[0] as string;
      //if index 0 does not have current timer id it means card does not have timer hence do nothing
      if (!currentTimerId) return;
    }
    const timerData = timerGroup.timerStore[currentTimerId];
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
        `${timerGroup.timerGroupStore.name} => ${timerData.name} | completed`
      );
      play(defaultSound, 2);

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
    localStorage.setItem(
      "timerCardData" + id,
      JSON.stringify(newTimerCardData)
    );
  };

  return {
    ...timerGroup,
    playCard,
    pausecard,
    stopCard,
    toggleLooping,
    timerCardData,
    runningTimer,
  };
}
