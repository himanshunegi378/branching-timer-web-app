import { memo, useCallback, useEffect, useState } from 'react';
import { useInjector } from '../../../contexts/InjectorContext';
import { TimerCard, runningTimerType } from '../../TimerCards/TimerCard';
import { TimerCard as TimerCardType } from '../../TimerCards/TimerCards.types';

import { TimerProps } from '../../../component/organisms/Timer/Timer.types';
import { Timer } from '../../../component/organisms/Timer/Timer.component';
import { ComponentRegistry } from '../../ComponentRegistry';

export class TimerList {
  constructor(componentRegistry: ComponentRegistry) {
    // @ts-ignore
    componentRegistry.register('timerList', 'timerListUI', memo(TimerListUI));
  }
}

const useTimerCardData = (timerCardId:string) => {
  const injector = useInjector();
  // @ts-ignore
  const timerCard: TimerCard = injector.get('timerCards').getTimerCard(timerCardId);
  const [timerCardData, setTimerCardData] = useState<TimerCardType>(() => {
    return timerCard.timerCardData;
  });

  useEffect(() => {
    const updateTimerData = (data: TimerCardType) => {
      setTimerCardData(data);
    };

    timerCard.on('timer_data', updateTimerData);

    return () => {
      timerCard.off('timer_data', updateTimerData);
    };
  }, [timerCard]);

  return timerCardData;
};

const useTimer = ({ timerCardId }: { timerCardId: string }) => {
  const injector = useInjector();
  // @ts-ignore
  const timerCard: TimerCard = injector
    .get('timerCards')
    .getTimerCard(timerCardId);
  const timerCardData = useTimerCardData(timerCardId);

  const [runningTimer, setRunningTimer] = useState<runningTimerType>({
    id: '',
    remainingTime: 0,
  });

  useEffect(() => {
    const updateRunningTimer = (runningTimer: runningTimerType) => {
      setRunningTimer(runningTimer);
    };
    timerCard.on('running_timer', updateRunningTimer);

    return () => {
      timerCard.off('running_timer', updateRunningTimer);
    };
  }, [timerCard]);

  return useCallback(
    (timerId: string): TimerProps => {
      const timer = timerCardData?.timerGroup.timers.find(
        (timer) => timer.id === timerId
      );

      return {
        id: timerId,
        active: runningTimer.id === timerId,
        name: timer?.name ?? '',
        time: timer?.time ?? 0,
        timerCard: timerCard,
        onDelete: () => {
          timerCard?.removeTimer(timerId);
        },
        onNameChange: (name) => {
          timerCard?.editTimer(timerId, { name });
        },
        onTimeChange: (time) => {
          timerCard?.editTimer(timerId, { time });
        },
      };
    },
    [timerCardData, runningTimer, timerCard]
  );
};

const TimerListUI = ({ timerCardId }: { timerCardId: string }) => {
  const injector = useInjector();
  // @ts-ignore
  const timerCard: TimerCard = injector.get('timerCards').getTimerCard(timerCardId);
  const timerCardData = useTimerCardData(timerCardId);
  const timerProps = useTimer({
    timerCardId: timerCardData.id,
  });

  return (
    <div className='overflow-auto fancy-scrollbar px-1 flex-1 mt-2  p-2 rounded'>
      {timerCardData.timerGroup.timers.map((timer) => {
        if (!timer) return null;
        return <Timer key={timer.id} {...timerProps(timer.id)} />;
      })}
    </div>
  );
};

// @ts-ignore
TimerList.$inject = ['componentRegistry'];
