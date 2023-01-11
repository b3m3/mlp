export const textOverflow = (text, length) => {
  return text.length > length ? text.slice(0, length) + '..' : text;
};

export const titleToPathname = str => {
  return '/' + str.toLowerCase().split(' ').join('_');
};

export const pathnameToTitle = pathname => {
  return pathname.split('_').join(' ')[0].toUpperCase() + pathname.split('_').join(' ').slice(1);
};

export const getVideoFromLocation = location => {
  return '/' + location.split('/')[2];
};

export const getLangIdFromLocation = location => {
  return location.split('/')[1];
}

export const nextPage = (id, location) => {
  return location.indexOf(id) !== -1 
    ? location.slice(0, location.indexOf(id)) + (+id + 1) : null;
};

export const prevPage = (id, location) => {
  return location.indexOf(id) !== -1 
    ? location.slice(0, location.indexOf(id)) + (+id - 1) : null;
};

export const goToPage = (id, location, page) => {
  return location.slice(0, location.indexOf(id)) + page
};

export const changeLangLocation = (location, lang) => {
  return '/'+lang + location.slice(3);
};

export const translateTitles = (arr, title, lang) => {
  return arr.map(el => el[title] && el[title][0][lang]);
};

export const notFoundError = (arr, lang) => {
  return arr.map(el => el[lang]);
};