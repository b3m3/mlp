export const textOverflow = (text, length) => {
  return text.length > length ? text.slice(0, length) + '..' : text;
};

export const titleToLocation = str => {
  return '/' + str.toLowerCase().split(' ').join('_');
};
