import { useCallback } from 'react';
import { useTimerCard } from '../../contexts/TimerCards';
import { TimerProps } from '../organisms/Timer/Timer.types';

const useTimer = (timerCardId: string) => {
  const { timerCardData, runningTimer, actions } = useTimerCard(timerCardId);

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
        onDelete: () => {
          actions?.removeTimer(timerId);
        },
        onNameChange: (name) => {
          actions?.editTimer(timerId, { name });
        },
        onTimeChange: (time) => {
          actions?.editTimer(timerId, { time });
        },
      };
    },
    [timerCardData, runningTimer, actions]
  );
};

export default useTimer;
