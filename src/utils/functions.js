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

export const setLanguagePathname = (pathname, lang) => {
  const find = 'lang=';
  const index = pathname.indexOf(find);

  if (index === -1) {
    return;
  } else {
    return pathname.slice(0, index + find.length) + lang + pathname.slice(index + find.length + lang.length);
  }
};

export const translateTitles = (arr, title, lang) => {
  return arr.map(el => el[title] && el[title][0][lang]);
};