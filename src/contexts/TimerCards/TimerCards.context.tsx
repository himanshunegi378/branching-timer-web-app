import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { TimerCardLocalStorage } from '../../lib/timerCardStorage/TimerCardLocalStorage';
import { timerCardIDsStorage } from './storage';
import { TimerCard } from './TimerCard';
import { NotificationPlugin } from '../../plugins/NotificationPlugin';
import { Injector } from 'didi';
import modules, { ModuleType } from '../../modules';
import { TimerDisplayPlugin } from '../../plugins/TimerDisplayPlugin';

export const TimeCardsContext = React.createContext<{
  Timercards: Record<string, TimerCard>;
  actions: any;
  timerCardsId: string[];
}>({
  Timercards: {},
  actions: {},
  timerCardsId: [],
});
const setupNewTimerCard = (id: string) => {
  // const timerCardStorage = new TimerCardServerStorage({
  //   userId: "himanshu",
  //   userName: "Himanshu Singh Negi",
  // });
  const timerCardStorage = new TimerCardLocalStorage();
  const timerCard = new TimerCard(id, timerCardStorage);
  const injector = new Injector<ModuleType>([
    // @ts-ignore
    ...modules,
    {
      timerCard: ['value', timerCard],
    },
  ]);
  timerCard.injector = injector;
  injector.init();

  // const notificationPlugin = new NotificationPlugin();
  // const timerDisplayPlugin = new TimerDisplayPlugin();
  // notificationPlugin.init().then((plugin) => {
  //   timerCard.addPlugin(notificationPlugin);
  // });
  // timerDisplayPlugin.init().then((plugin) => {
  //   timerCard.addPlugin(timerDisplayPlugin);
  // });

  return timerCard;
};
export function TimerCardsProvider(props: PropsWithChildren<{}>) {
  const TimerCardsRef = useRef<Record<string, TimerCard>>({});
  const [timerCardsId, setTimerCardsId] = useState<string[]>([]);

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
  }, []);

  useEffect(() => {
    //save timercards data to storage on page close

    const onPageClose = () => {
      timerCardsId.forEach((id) => {
        TimerCardsRef.current[id].save();
      });
    };
    window.addEventListener('beforeunload', onPageClose);
    return () => {
      window.removeEventListener('beforeunload', onPageClose);
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
