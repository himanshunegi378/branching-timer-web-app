import { useEffect, useState } from "react";

const getItem = (key: string) => {
  const stringifiedData = localStorage.getItem(key);
  if (!stringifiedData) return null;
  const parsedData = JSON.parse(stringifiedData);
  return parsedData;
};

const saveItem = (key: string, data: { [key: string]: any }) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

const useLocalStorage = <T,>(
  initialData: T,
  key: string,
  overRide: boolean
): any => {
  const [data, setData] = useState<T>(initialData);

  useEffect(() => {
    if (!key) return;
    const dataInLocalStorage = getItem(key);
    if (dataInLocalStorage) {
      console.log(dataInLocalStorage);
      setData(dataInLocalStorage);
    }
  }, [key]);

  const setValue = (data: T) => {
    console.log(key);
    setData(data);
    saveItem(key, data);
  };

  return [data, setValue];
};

export default useLocalStorage;
