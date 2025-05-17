import { get } from 'lodash';
import { useSyncExternalStore } from 'react';
import { DataStore } from '../modules/DataStore';

const useDataStoreSelector = <T = any>(
  dataStore: DataStore<Record<string, any>>,
  selector: string | ((data: Record<string, any>) => T)
) => {
  const data = useSyncExternalStore(dataStore.subscribe, dataStore.getSnapshot);

  if (typeof selector === 'string') {
    return get(data, selector) as T;
  }

  return selector(data)
};

export default useDataStoreSelector;

