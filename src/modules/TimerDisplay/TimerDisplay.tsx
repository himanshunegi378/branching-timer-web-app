import { ComponentType, memo, useEffect, useState } from 'react';
import { TimerCard, runningTimerType } from '../TimerCards/TimerCard';
import { useInjector } from '../../contexts/InjectorContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ComponentRegistry } from '../ComponentRegistry';
import InternalPlugin from '../InternalPlugin';

export class TimerDisplay extends InternalPlugin {
  componentRegistry: ComponentRegistry;

  constructor(componentRegistry: ComponentRegistry) {
    super();
    this.componentRegistry = componentRegistry;
    // @ts-ignore
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

const TimeDisplayUI = (props: { timerCardId: string }) => {
  const { timerCardId } = props;
  const injector = useInjector();
  // @ts-ignore
  const timerCard: TimerCard = injector
    .get('timerCards')
    .getTimerCard(timerCardId);
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
    <div className='flex justify-center items-center rounded-lg p-6 '>
      <div className='text-4xl font-mono font-bold text-blue-600 select-none flex justify-center'>
        {paddedMinutes.split('').map((digit, idx) => (
          <AnimatePresence mode={'popLayout'} key={digit + idx}>
            <motion.span
              initial='hidden'
              animate='visible'
              exit='exit'
              variants={numberVariants}
              transition={{ duration: 0.3 }}
              className='inline-block w-6 text-center'
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        ))}
        <span className='text-gray-400'>:</span>
        {paddedSeconds.split('').map((digit, idx) => (
          <AnimatePresence mode={'popLayout'} key={digit + idx}>
            <motion.span
              initial='hidden'
              animate='visible'
              exit='exit'
              variants={numberVariants}
              transition={{ duration: 0.3 }}
              className='inline-block w-6 text-center'
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
};
