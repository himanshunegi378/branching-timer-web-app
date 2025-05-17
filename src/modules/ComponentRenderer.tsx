import React, { useEffect, useReducer } from 'react';
import { ComponentRegistry } from './ComponentRegistry';
import { Event } from './Event';
import { InjectorContext, useInjector } from '../contexts/InjectorContext';
import useDataStore from '../hooks/useDataStore';

// @ts-ignore
export const ComponentsRenderer = ({ tag,props }:{
  tag: string,
  props?: Record<string, unknown>
}) => {
  const injector = useInjector();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const ComponentsRecord = useDataStore(injector.get('dataStore'), `componentRegistry/${tag}`);
  const Components = Object.values(ComponentsRecord);
  // useEffect(() => {
  //   const registerEvent = `componentRegistry/registered/${tag}`;
  //   const deRegisterEvent = `componentRegistry/deRegistered/${tag}`;
  //   const events = {
  //     [registerEvent]: () => {
  //       forceUpdate();
  //     },
  //     [deRegisterEvent]: () => {
  //       forceUpdate();
  //     },
  //   };
  //   const eventBus = injector.get('eventBus') as Event;
  //   for (const key in events) {
  //     if (Object.hasOwn(events, key)) {
  //       const handler = events[key];
  //       eventBus.on(key, handler);
  //     }
  //   }
  //   return () => {
  //     for (const key in events) {
  //       if (Object.hasOwn(events, key)) {
  //         const handler = events[key];
  //         eventBus.off(key, handler);
  //       }
  //     }
  //   };
  // }, [injector, tag]);
  // const Components = (
  //   injector.get('componentRegistry') as ComponentRegistry
  // ).getComponents(tag);
  if(!Array.isArray(Components)) return null;
  return (
    <InjectorContext.Provider value={injector}>
      {Components.map((Component, index) => (
        <Component key={index} {...props} />
      ))}
    </InjectorContext.Provider>
  );
};
