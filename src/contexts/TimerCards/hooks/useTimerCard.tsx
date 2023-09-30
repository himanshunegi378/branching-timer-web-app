import React, { useEffect, useState } from 'react';
import { TimerCard } from '../TimerCard';
import { TimeCardsContext } from '../TimerCards.context';
import { TimerCard as TimerCardType } from '../TimerCards.types';
// import { useRunningTimer } from "./useRunningTimer"

/**
 * Provides data of the timercard with matching id
 * @param timerCardId id of the timercard for which we want the data
 * @returns
 */
export function useTimerCard(timerCardId: string) {
  const { Timercards } = React.useContext(TimeCardsContext);
  const [timerCardData, setTimerCardData] = useState<TimerCardType>();
  const [runningTimer, setRunningTimer] = useState({
    id: '',
    remainingTime: 0,
  });
  const [TimerCard, setTimerCard] = useState<TimerCard | null>(null);

  useEffect(() => {
    setTimerCard(Timercards[timerCardId]);
    return () => {
      setTimerCard(null);
    };
  }, [Timercards, timerCardId]);

  useEffect(() => {
    if (!TimerCard) return;
    const updateTimerCardData = (timerCardData: TimerCardType) => {
      setTimerCardData(timerCardData);
    };

    const updateRunningTimer = (runningTimer: any) => {
      setRunningTimer(runningTimer);
    };

    TimerCard.on('timer_data', updateTimerCardData);
    TimerCard.on('running_timer', updateRunningTimer);

    TimerCard.emit('new_connection');
    return () => {
      TimerCard.off('timer_data', updateTimerCardData);
      TimerCard.off('running_timer', updateRunningTimer);
    };
  }, [TimerCard]);

  return { timerCardData, runningTimer, actions: TimerCard };
}

export type UseTimerCard = ReturnType<typeof useTimerCard>;
