import localforage from 'localforage';
localforage.setDriver([localforage.INDEXEDDB, localforage.LOCALSTORAGE]);
localforage.config({
  version: 1,
  name: 'TimerCardsd',
});
const getItem = async <T>(key: string): Promise<T | null> => {
  const data = await localforage.getItem(key);
  console.log(`Getting ${key} from localStorage`, data);
  return data as T;
};

const setItem = (key: string, data: { [key: string]: any }) => {
  console.log(`Saving ${key} to localStorage`, data);
  return localforage.setItem(key, data);
};

const removeItem = (key: string) => {
  return localforage.removeItem(key);
};

const ls = { getItem, setItem, removeItem };

export { ls as localStorage };
