export const textOverflow = (text, length) => {
  return text.length > length ? text.slice(0, length) + '..' : text;
};

export const titleToLocation = str => {
  return '/' + str.toLowerCase().split(' ').join('_');
};

export const setLanguagePathname = (pathname, lang) => {
  const find = 'lang=';
  const index = pathname.indexOf(find);

  if (index === -1) {
    return;
  } else {
    return pathname.slice(0, index + find.length) + lang;
  }
};