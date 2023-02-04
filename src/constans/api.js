// BASE
export const API_ROOT = 'https://api.themoviedb.org/3';
export const API_KEY = '?api_key='+process.env.REACT_APP_API_KEY;

// IMDB
export const IMDB_ROOT = 'https://www.imdb.com/title/';
export const IMDB_ACTOR_ROOT = 'https://www.imdb.com/name/';

// YOUTUBE
export const YOUTUBE_TRAILER_ROOT = 'https://www.youtube.com/embed/';
export const YOUTUBE_TRAILER_AUTOPLAY = '?autoplay=1';
export const YOUTUBE_POSTER_ROOT = 'https://img.youtube.com/vi/';
export const YOUTUBE_POSTER_END = '/mqdefault.jpg';

// IMG
export const API_POSTER = 'https://image.tmdb.org/t/p/w500/';
export const API_IMAGE_ORIGINAL = 'https://image.tmdb.org/t/p/original';

// GENERAL
export const API_LANGUAGE = '&language=';
export const API_PAGE = '&page=';
export const API_QUERY = '&query=';

// FOR DISCOVER
export const API_POPULARITY = '&popularity';
export const API_WITH_GENRES = '&with_genres=';
export const API_SORT = '&sort_by=';
export const API_RELEASE_DATE = '&release_date';
export const API_VOTE_AVERAGE = '&vote_average';
export const API_FIRST_AIR_DATE = '&first_air_date';

export const API_DESC = '.desc'; // <=
export const API_ASC = '.asc'; // >=
export const API_LTE = '.lte='; // <=
export const API_GTE = '.gte='; // >=

// LANGUAGES
export const API_EN = 'en';
export const API_RU = 'ru';
export const API_UK = 'uk';

// MAIN CATEGORY
export const API_MOVIE = '/movie';
export const API_TV_SHOWS = '/tv';
export const API_ACTORS = '/person';
export const API_SEARCH = '/search';
export const API_DISCOVER = '/discover';

export const API_VIDEOS = '/videos';
export const API_RECOMMEND = '/recommendations';
export const API_REVIEWS = '/reviews';
export const API_CREDITS = '/credits';
export const API_GENRE = '/genre';
export const API_LIST = '/list';
export const API_DAY = '/day';
export const API_WEEK = '/week';
export const API_ACTORS_MOVIE_CREDITS = '/movie_credits';
export const API_ACTORS_TV_CREDITS = '/tv_credits';
export const API_ACTORS_IMAGES = '/images'

// CATEGORY GENERAL
export const API_POPULAR = '/popular';
export const API_TOP_RATED = '/top_rated';
export const API_TRENDING = '/trending';
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

// ACTORS
export const ACTORS_POPULAR = API_ROOT+API_ACTORS+API_POPULAR+API_KEY;