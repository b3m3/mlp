export const textOverflow = (text, length) => {
  return text.length > length ? text.slice(0, length) + '..' : text;
};

export const titleToPathname = str => {
  return '/' + str.toLowerCase().split(' ').join('_');
};

export const pathnameToTitle = pathname => {
  return pathname.split('_').join(' ')[0].toUpperCase() + pathname.split('_').join(' ').slice(1);
};

export const getVideoPathname = pathname => {
  return '/' + pathname.split('/')[1];
};

export const changePageLocation = (id, location, operator) => {
  const res = {'+': (+id + 1), '-': (+id - 1)};
  return location.indexOf(id) !== -1 
    ? location.slice(0, location.indexOf(id)) + res[operator] : null;
};

export const goToPage = (location, page) => {
  const id = 'page=';
  return location.indexOf(id) !== -1 
    && location.slice(0, location.indexOf(id)) + id + page;
};

export const changeLangLocation = (location, lang) => {
  const id = 'lang=';
  return location.indexOf(id) !== -1 
    && location.slice(0, location.indexOf(id) + id.length) 
      + lang 
      + location.slice(location.indexOf(id) + id.length + lang.length)
};

export const translateTitles = (arr, title, lang) => {
  return arr.map(el => el[title] && el[title][0][lang]);
};

export const notFoundError = (arr, lang) => {
  return arr.map(el => el[lang]);
};