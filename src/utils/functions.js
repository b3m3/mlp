export const getTypeFromLocation = location => {
  return '/' + location.split('/')[2];
};

export const getTitleLang = (arr, lang) => {
  return arr.map(t => t[lang]);
};