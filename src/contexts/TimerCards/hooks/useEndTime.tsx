import { useContext, useEffect, useState } from 'react';
import { TimeCardsContext } from '../TimerCards.context';
import { TimerCard as TimerCardTypes } from '../TimerCards.types';

export function useEndTime(timerCardId: string, cycles: number) {
  const { Timercards } = useContext(TimeCardsContext);
  const [endTimes, setEndTimes] = useState<Date[]>([]);

  useEffect(() => {
    const calculateEndTime = (timerCardData: TimerCardTypes) => {
      const timers = timerCardData.timerGroup.timers;
      let totalTimeOfACycle = 0;
      timers.forEach((timer) => (totalTimeOfACycle += timer.time));
      const endTimes: Date[] = [];

      for (let currentCycle = 0; currentCycle < cycles; currentCycle++) {
        const timeShouldHaveElapsed =
          totalTimeOfACycle + totalTimeOfACycle * currentCycle;
        endTimes.push(new Date(Date.now() + timeShouldHaveElapsed * 1000));
      }
      setEndTimes(endTimes);
    };

    const timerCard = Timercards[timerCardId];
    calculateEndTime(timerCard.getTimerData());

    timerCard.on('timer_data', calculateEndTime);

    return () => {
      timerCard.off('timer_data', calculateEndTime);
    };
  }, [Timercards, cycles, timerCardId]);

  return endTimes;
}
