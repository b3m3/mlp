export const addToLocalStorage = (key, val) => {
  return localStorage.setItem(key, val)
};

export const getFromLocalStorage = key => {
  return localStorage.getItem(key);
};

export const removeFromLocalStorage = (key) => {
  return localStorage.removeItem(key)
};

export const addArrToLocalStorage = (key, arr) => {
  return localStorage.setItem(key, JSON.stringify(arr));
};