export const addToLocalStorage = (key, val) => {
  return localStorage.setItem(key, val)
};

export const getFromLocalStorage = key => {
  return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
  return localStorage.removeItem(key)
};