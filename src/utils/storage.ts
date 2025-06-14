export const setItem = <T>(key: string, val: T) => {
  localStorage.setItem(key, JSON.stringify(val));
};

export const getItem = (key: string) => {
  const item = localStorage.getItem(key);
  return item && JSON.parse(item);
};
