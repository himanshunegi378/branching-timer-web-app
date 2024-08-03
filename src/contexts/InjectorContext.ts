import { Injector } from "didi";
import { createContext, useContext } from "react";
import { ModuleType } from "../modules";

export const InjectorContext = createContext<Injector<ModuleType>>(
  // @ts-ignore
  {}
);

export const useInjector = () => {
  return useContext(InjectorContext);
};
