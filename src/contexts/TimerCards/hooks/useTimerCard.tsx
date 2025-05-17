import React, { useEffect, useState } from 'react';
import { TimerCard, runningTimerType } from '../../../modules/TimerCards/TimerCard';
import { TimeCardsContext } from '../TimerCards.context';
import { TimerCard as TimerCardType } from '../../../modules/TimerCards/TimerCards.types';
import { useInjector } from '../../InjectorContext';
// import { useRunningTimer } from "./useRunningTimer"

/**
 * Provides data of the timercard with matching id
 * @param timerCardId id of the timercard for which we want the data
 * @returns
 */
export function useTimerCard(timerCardId: string) {
  const injector = useInjector()
  // @ts-ignore
  const timerCard = injector.get('timerCards').getTimerCard(timerCardId);
  const [timerCardData, setTimerCardData] = useState<TimerCardType>();
  const [runningTimer, setRunningTimer] = useState<runningTimerType>({
    id: '',
    remainingTime: 0,
  });

  useEffect(() => {
    if (!timerCard) return;
    const updateTimerCardData = (timerCardData: TimerCardType) => {
      setTimerCardData(timerCardData);
    };

    const updateRunningTimer = (runningTimer: runningTimerType) => {
      setRunningTimer(runningTimer);
    };

    timerCard.on('timer_data', updateTimerCardData);
    timerCard.on('running_timer', updateRunningTimer);

    timerCard.emit('new_connection');
    return () => {
      timerCard.off('timer_data', updateTimerCardData);
      timerCard.off('running_timer', updateRunningTimer);
    };
  }, [timerCard]);

  return { timerCardData, runningTimer, actions: timerCard };
}

export type UseTimerCard = ReturnType<typeof useTimerCard>;
