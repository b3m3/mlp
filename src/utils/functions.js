export const textOverflow = (text, length) => {
  return text.length > length ? text.slice(0, length) + '..' : text;
};

export const titleToPathname = str => {
  return '/' + str.toLowerCase().split(' ').join('_');
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