import { ComponentType, memo, useEffect, useState } from 'react';
import {
  TimerCard,
  runningTimerType,
} from '../../contexts/TimerCards/TimerCard';
import { useInjector } from '../../contexts/InjectorContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ComponentRegistry } from '../ComponentRegistry';

export class TimerDisplay {
  componentRegistry: ComponentRegistry;
  constructor(componentRegistry: ComponentRegistry) {
    this.componentRegistry = componentRegistry;
    this.updateTimerDisplay(TimeDisplayUI);
  }
  updateTimerDisplay(comp: ComponentType) {
    this.componentRegistry.register('timerDisplay', '1', memo(comp));
  }
}

// @ts-ignore
TimerDisplay.$inject = ['componentRegistry'];

const numberVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const TimeDisplayUI = () => {
  const injector = useInjector();
  const timerCard: TimerCard = injector.get('timerCard');
  const [runningTimer, setRunningTimer] = useState<runningTimerType>({
    id: '',
    remainingTime: 0,
  });
  const { remainingTime } = runningTimer;

  useEffect(() => {
    const updateRunningTimer = (runningTimer: runningTimerType) => {
      setRunningTimer(runningTimer);
    };
    timerCard.on('running_timer', updateRunningTimer);

    return () => {
      timerCard.off('running_timer', updateRunningTimer);
    };
  }, [timerCard]);
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');

  return (
    <div className='text-7xl font-mono tracking-tighter font-medium text-center select-none'>
      {paddedMinutes.split('').map((digit, idx) => (
        <AnimatePresence mode={'popLayout'} key={digit + idx}>
          <motion.span
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={numberVariants}
            transition={{ duration: 0.3 }}
          >
            {digit}
          </motion.span>
        </AnimatePresence>
      ))}
      :
      {paddedSeconds.split('').map((digit, idx) => (
        <AnimatePresence mode={'popLayout'} key={digit + idx}>
          <motion.span
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={numberVariants}
            transition={{ duration: 0.3 }}
          >
            {digit}
          </motion.span>
        </AnimatePresence>
      ))}
    </div>
  );
};

{
  /* <TimerDisplay remainingTime={runningTimer.remainingTime} /> */
}
