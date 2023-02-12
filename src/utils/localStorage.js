export const addToLocalStorage = (key, val) => {
  return localStorage.setItem(key, val)
};

export const getFromLocalStorage = key => {
  return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
  return localStorage.removeItem(key)
};

export const addArrToStorage = (key, arr) => {
  return localStorage.setItem(key, JSON.stringify(arr));
};

export const getArrFromStorage= (key) => {
  const arr = localStorage.getItem(key);
  return JSON.parse(arr);
};