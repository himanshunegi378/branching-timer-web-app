const getItem = <T>(key: string): T | null => {
  const stringifiedData = localStorage.getItem(key);
  if (!stringifiedData) return null;
  const parsedData = JSON.parse(stringifiedData);
  return parsedData;
};

const setItem = (key: string, data: { [key: string]: any }): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};

const ls = { getItem, setItem, removeItem };

export { ls as localStorage };
