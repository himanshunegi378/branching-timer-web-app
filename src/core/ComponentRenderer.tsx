import React, { useSyncExternalStore, useCallback } from 'react';
import { ComponentRegistry } from './ComponentRegistry';
import { Event } from './Event';
import { InjectorContext } from '../contexts/InjectorContext';
import { PluginErrorBoundary } from './PluginErrorBoundary';

// @ts-ignore
export const ComponentsRenderer = ({ tag, injector }: { tag: string; injector: any }) => {
  const eventBus = injector.get('eventBus') as Event;
  const componentRegistry = injector.get('componentRegistry') as ComponentRegistry;

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const registerEvent = `componentRegistry/registered/${tag}`;
      const deRegisterEvent = `componentRegistry/deRegistered/${tag}`;

      eventBus.on(registerEvent, onStoreChange);
      eventBus.on(deRegisterEvent, onStoreChange);

      return () => {
        eventBus.off(registerEvent, onStoreChange);
        eventBus.off(deRegisterEvent, onStoreChange);
      };
    },
    [eventBus, tag]
  );

  const getSnapshot = useCallback(() => {
    return componentRegistry.getComponents(tag);
  }, [componentRegistry, tag]);

  const Components = useSyncExternalStore(subscribe, getSnapshot);

  return (
    <InjectorContext.Provider value={injector}>
      {Components.map((Component, index) => {
        const displayName = Component.displayName || Component.name || `Component-${index}`;
        return (
          <PluginErrorBoundary key={index} pluginName={displayName}>
            <Component />
          </PluginErrorBoundary>
        );
      })}
    </InjectorContext.Provider>
  );
};
