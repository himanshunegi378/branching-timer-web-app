import React, { useEffect, useReducer } from 'react';
import { ComponentRegistry } from './ComponentRegistry';
import { Event } from './Event';
import { InjectorContext } from '../contexts/InjectorContext';

// @ts-ignore
export const ComponentsRenderer = ({ tag, injector }) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    const registerEvent = `componentRegistry/registered/${tag}`;
    const deRegisterEvent = `componentRegistry/deRegistered/${tag}`;
    const events = {
      [registerEvent]: () => {
        forceUpdate();
      },
      [deRegisterEvent]: () => {
        forceUpdate();
      },
      // `: ()=>{},
      // `componentRegistry/deRegistered/${tag}`: ()=>{},
    };
    const eventBus = injector.get('eventBus') as Event;
    for (const key in events) {
      if (Object.hasOwn(events, key)) {
        const handler = events[key];
        eventBus.on(key, handler);
      }
    }
    return () => {
      for (const key in events) {
        if (Object.hasOwn(events, key)) {
          const handler = events[key];
          eventBus.off(key, handler);
        }
      }
    };
  }, [injector, tag]);
  const Components = (
    injector.get('componentRegistry') as ComponentRegistry
  ).getComponents(tag);

  return (
    <InjectorContext.Provider value={injector}>
      {Components.map((Component, index) => (
        <Component key={index} />
      ))}
    </InjectorContext.Provider>
  );
};
