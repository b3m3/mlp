export const getTypeFromLocation = location => {
  return '/' + location.split('/')[2];
};

export const getTitleLang = (arr, lang) => {
  return arr.map(t => t[lang]);
};

export const setDocumentTitle = title => {
  return document.title = `Movies lib | ${title}`;
}