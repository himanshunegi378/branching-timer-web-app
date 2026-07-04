import { createContext, useContext } from 'react';
import { StrictInjector } from '../types/injector.types';

export const InjectorContext = createContext<StrictInjector>(
  {} as StrictInjector
);

export const useInjector = () => {
  return useContext(InjectorContext);
};
