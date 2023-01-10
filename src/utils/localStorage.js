export const addToLocalStorage = (key, val) => {
  return localStorage.setItem(key, JSON.stringify(val))
};

export const getFromLocalStorage = key => {
  return JSON.parse(localStorage.getItem(key));
};