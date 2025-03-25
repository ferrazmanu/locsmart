export const getSessionStorage = <T>(key: string): T | null => {
  const item = sessionStorage.getItem(key);

  return item ? (JSON.parse(item) as T) : null;
};

export const setSessionStorage = <T>(key: string, item: T): void => {
  sessionStorage.setItem(key, JSON.stringify(item));
};

export const removeSessionStorage = (key: string) => {
  sessionStorage.removeItem(key);
};

export const clearSessionStorage = () => {
  sessionStorage.clear();
};

export const getLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);

  return item ? (JSON.parse(item) as T) : null;
};

export const setLocalStorage = <T>(key: string, item: T): void => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
