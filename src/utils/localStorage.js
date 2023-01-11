export const addToLocalStorage = (key, val) => {
  return localStorage.setItem(key, val)
};

export const getFromLocalStorage = key => {
  return localStorage.getItem(key);
};