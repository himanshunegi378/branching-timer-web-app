import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { timerCardIDsStorage } from "./storage";
import { TimerCard } from "./TimerCard";
import { useCallback } from "react";
export const TimeCardsContext = React.createContext<{
  Timercards: Record<string, TimerCard>;
  actions: any;
  timerCardsId: string[];
}>({
  Timercards: {},
  actions: {},
  timerCardsId: [],
});

export function TimerCardsProvider(props: PropsWithChildren<{}>) {
  const TimerCardsRef = useRef<Record<string, TimerCard>>({});
  const [timerCardsId, setTimerCardsId] = useState<string[]>([]);

  const setupNewTimerCard = useCallback((id: string) => {
    const timerCard = new TimerCard(id);
    return timerCard;
  }, []);

  useEffect(() => {
    //on web page load get timercard data from storage and initalize tiemrcards
    const onPageOpen = async () => {
      const timerCardsId = await timerCardIDsStorage.load();
      if (!timerCardsId) return;

      timerCardsId.forEach((id) => {
        if (!id) return;
        const timerCard = setupNewTimerCard(id);

        TimerCardsRef.current[id] = timerCard;
      });
      setTimerCardsId(timerCardsId);
    };
    onPageOpen();
  }, [setupNewTimerCard]);

  useEffect(() => {
    //save timercards data to storage on page close

    const onPageClose = () => {
      timerCardsId.forEach((id) => {
        TimerCardsRef.current[id].save();
      });
    };
    window.addEventListener("beforeunload", onPageClose);
    return () => {
      window.removeEventListener("beforeunload", onPageClose);
    };
  }, [timerCardsId]);

  useEffect(() => {
    timerCardIDsStorage.save(timerCardsId);
  }, [timerCardsId]);

  const addTimerCard = (timercardId: string) => {
    const newTimerCard = setupNewTimerCard(timercardId);
    TimerCardsRef.current[timercardId] = newTimerCard;
    setTimerCardsId((ids) => [...ids, timercardId]);
  };

  const deleteTimerCard = async (timerCardId: string) => {
    await TimerCardsRef.current[timerCardId].onTimerCardDelete();
    delete TimerCardsRef.current[timerCardId];
    setTimerCardsId((ids) => ids.filter((id) => id !== timerCardId));
  };

  // const addAudio = (timerId: string, audioBlob: Blob[]) => {
  //     const audioId = addAudio()
  // }

  return (
    <TimeCardsContext.Provider
      value={{
        Timercards: TimerCardsRef.current,
        timerCardsId,
        actions: {
          addTimerCard,
          deleteTimerCard,
        },
      }}
    >
      {props.children}
    </TimeCardsContext.Provider>
  );
}
