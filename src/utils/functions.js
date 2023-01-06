export const textOverflow = (text, length) => {
  return text.length > length ? text.slice(0, length) + '..' : text;
};