import { Event } from '../modules/Event';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const useEvent = (eventBus: Event, eventName: string, handler: () => void) => {
  const handlerFunctionRef = useRef(handler);
  const [returnValue, setReturnValue] = useState();

  useLayoutEffect(() => {
    handlerFunctionRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const handler = () => {
      // @ts-ignore
      setReturnValue(handlerFunctionRef.current());
    };

    eventBus.on(eventName, handler);
    return () => {
      eventBus.off(eventName, handler);
    };
  }, [eventBus, eventName]);

  return returnValue;
};

export default useEvent;
