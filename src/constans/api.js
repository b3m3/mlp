// BASE
export const API_ROOT = 'https://api.themoviedb.org/3';
export const API_KEY = '?api_key='+process.env.REACT_APP_API_KEY;

// IMDB
export const IMDB_ROOT = 'https://www.imdb.com/title/';

// YOUTUBE
export const YOUTUBE_TRAILER_ROOT = 'https://www.youtube.com/embed/';
export const YOUTUBE_TRAILER_AUTOPLAY = '?autoplay=1';
export const YOUTUBE_POSTER_ROOT = 'https://img.youtube.com/vi/';
export const YOUTUBE_POSTER_END = '/mqdefault.jpg';

// GENERAL
export const API_LANGUAGE = '&language=';
export const API_PAGE = '&page=';
export const API_POSTER = 'https://image.tmdb.org/t/p/w500/';
export const API_BACKGROUND = 'https://image.tmdb.org/t/p/original';

// LANGUAGES
export const API_EN = 'en';
export const API_RU = 'ru';
export const API_UK = 'uk';

// MAIN CATEGORY
export const API_MOVIE = '/movie';
export const API_TV_SHOWS = '/tv';

export const API_VIDEOS = '/videos';
export const API_RECOMMEND = '/recommendations';
export const API_REVIEWS = '/reviews';

// CATEGORY GENERAL
export const API_POPULAR = '/popular';
export const API_TOP_RATED = '/top_rated';
export const API_LATEST = '/latest';

// CATEGORY MOVIES
export const API_NOW_PLAYING = '/now_playing';
export const API_UPCOMING = '/upcoming';

// CATEGORY TV Shows
export const API_AIRING_TODAY = '/airing_today';
export const API_ON_THE_AIR = '/on_the_air';

// MOVIES
export const MOVIES_POPULAR = API_ROOT+API_MOVIE+API_POPULAR+API_KEY;
export const MOVIES_TOP_RATED = API_ROOT+API_MOVIE+API_TOP_RATED+API_KEY;
export const MOVIES_NOW_PLAYING = API_ROOT+API_MOVIE+API_NOW_PLAYING+API_KEY;
export const MOVIES_UPCOMING = API_ROOT+API_MOVIE+API_UPCOMING+API_KEY;

// TV SHOWS
export const TV_SHOWS_POPULAR = API_ROOT+API_TV_SHOWS+API_POPULAR+API_KEY;
export const TV_SHOWS_TOP_RATED = API_ROOT+API_TV_SHOWS+API_TOP_RATED+API_KEY;
export const TV_SHOWS_AIRING_TODAY = API_ROOT+API_TV_SHOWS+API_AIRING_TODAY+API_KEY;
export const TV_SHOWS_ON_THE_AIR = API_ROOT+API_TV_SHOWS+API_ON_THE_AIR+API_KEY;