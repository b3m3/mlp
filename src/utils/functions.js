export const textOverflow = (text, length) => {
  return text.length > length ? text.slice(0, length) + '..' : text;
};

export const titleToPathname = str => {
  return '/' + str.toLowerCase().split(' ').join('_');
};

export const pathnameToTitle = pathname => {
  return pathname.split('_').join(' ')[0].toUpperCase() + pathname.split('_').join(' ').slice(1);
};

export const getTypeFromLocation = location => {
  return '/' + location.split('/')[2];
};

export const getLangIdFromLocation = location => {
  return location.split('/')[1];
}

export const nextPage = (id, location) => {
  return location.indexOf('/'+id) !== -1 
    ? location.slice(0, location.indexOf('/'+id)) + '/' + (+id + 1) : null;
};

export const prevPage = (id, location) => {
  return location.indexOf('/'+id) !== -1 
    ? location.slice(0, location.indexOf('/'+id)) + '/' + (+id - 1) : null;
};

export const goToPage = (id, location, page) => {
  return location.slice(0, location.indexOf('/'+id)) + '/' + page;
};

export const changeLangLocation = (location, lang) => {
  return '/'+lang + location.slice(3);
};

export const translateCategoryTitle = (arr, title, lang) => {
  return arr.map(el => el[title] && el[title][0][lang]);
};

export const notFoundError = (arr, lang) => {
  return arr.map(el => el[lang]);
};

export const convertTime = time => {
  if (typeof time === 'object' && time.length) {
    if (Math.floor(time[0] / 60) > 0) {
      return `${Math.floor(time[0] / 60)}h ${time[0] % 60}m`;
    }

    return `${time[0] % 60}m`;
  }

  if (Math.floor(time / 60) > 0) {
    return `${Math.floor(time / 60)}h ${time % 60}m`;
  }

  return `${time % 60}m`;
};

export const getYearFromDate = date => {
  return date.split('-')[0];
};

export const getRatingNum = num => {
  const arr = num.toString().split('.')[1];

  if (arr) {
    return `${num.toString().split('.')[0]}.${num.toString().split('.')[1][0]}`;
  }

  return num;
};

export const getGenresFromId = (list, ids) => {
  if (typeof ids[0] === 'object') {
    return list.filter(el1 => ids.some(el2 => el1.id === el2.id));
  }

  return list.filter(el1 => ids.some(el2 => el1.id === el2));
};