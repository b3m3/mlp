// BASE
export const API_ROOT = 'https://api.themoviedb.org/3';
export const API_KEY = '?api_key='+process.env.REACT_APP_API_KEY;

// GENERAL
export const API_LANGUAGE = '&language=';
export const API_PAGE = '&page=';
export const API_POSTER = 'https://image.tmdb.org/t/p/w500/';

// LANGUAGES
export const API_EN = 'en-US';
export const API_RU = 'ru-RU';
export const API_UK = 'uk';

// MAIN CATEGORY
export const API_MOVIE = '/movie';
export const API_SERIALS = '/tv';

// CATEGORY GENERAL
export const API_POPULAR = '/popular';
export const API_LATEST = '/latest';
export const API_TOP_RATED = '/top_rated';

// CATEGORY MOVIES
export const API_NOW_PLAYING = '/now_playing';
export const API_UPCOMING = '/upcoming';

// CATEGORY SERIALS
export const API_AIRING_TODAY = '/airing_today';
export const API_ON_THE_AIR = '/on_the_air';

export const MOVIES_POPULAR = API_ROOT+API_MOVIE+API_POPULAR+API_KEY;
export const MOVIES_TOP_RATED = API_ROOT+API_MOVIE+API_TOP_RATED+API_KEY;
export const MOVIES_NOW_PLAYING = API_ROOT+API_MOVIE+API_NOW_PLAYING+API_KEY;
export const MOVIES_UPCOMING = API_ROOT+API_MOVIE+API_UPCOMING+API_KEY;