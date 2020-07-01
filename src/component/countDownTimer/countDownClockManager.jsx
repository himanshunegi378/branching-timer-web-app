import React, { useEffect, useRef } from 'react'
import createCountDownTimer, { createCountDownTimerWithCardId, doesCardIdExist } from './newCountDownClock'

const CountDownClockManager = (props) => {
  const { onFinish = () => { }, onTick = () => { }, onStopped = () => { }, activeTimer, state, cardId } = props


  const onCountDownFinished = React.useCallback(
    () => {
      onFinish()
    },
    [onFinish],
  )

  const onCountDownTick = React.useCallback(
    (seconds) => {
      onTick(seconds)
    },
    [onTick],
  )


  useEffectDebugger(() => {
    if (!activeTimer) return
    const timer = doesCardIdExist(cardId)
    if (timer) {
      console.log(timer)
      clearInterval(timer.handle)
      createCountDownTimerWithCardId(cardId, timer.remainingTime, onTick, onFinish)
    }
    else {
      const { mins, secs } = activeTimer
      const seconds = (mins ? mins * 60 : 0) + (secs || 0)
      const timer = createCountDownTimerWithCardId(cardId, seconds, onTick, onFinish)
      return () => {
        // clearInterval(timer.handle)
        // onStopped()

      }
    }
  }, [activeTimer, cardId])

  return (
    <>

    </>
  )
}

const usePrevious = (value, initialValue) => {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const useEffectDebugger = (effectHook, dependencies, dependencyNames = []) => {
  const previousDeps = usePrevious(dependencies, []);

  const changedDeps = dependencies.reduce((accum, dependency, index) => {
    if (dependency !== previousDeps[index]) {
      const keyName = dependencyNames[index] || index;
      return {
        ...accum,
        [keyName]: {
          before: previousDeps[index],
          after: dependency
        }
      };
    }

    return accum;
  }, {});

  if (Object.keys(changedDeps).length) {
    console.log('[use-effect-debugger] ', changedDeps);
  }

  useEffect(effectHook, dependencies);
};

export default CountDownClockManager
