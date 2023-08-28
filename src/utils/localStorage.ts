import localforage from 'localforage';
localforage.setDriver([localforage.INDEXEDDB, localforage.LOCALSTORAGE]);
const getItem = async <T>(key: string): Promise<T | null> => {
  return localforage.getItem(key);
};

const setItem = (key: string, data: { [key: string]: any }) => {
  return localforage.setItem(key, data);
};

const removeItem = (key: string) => {
  return localforage.removeItem(key);
};

const ls = { getItem, setItem, removeItem };

export { ls as localStorage };
