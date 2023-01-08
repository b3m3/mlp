export const addToLocalStorage = (key, arr) => {
  return localStorage.setItem(key, JSON.stringify(arr))
};

export const getFromLocalStorage = key => {
  return JSON.parse(localStorage.getItem(key));
};