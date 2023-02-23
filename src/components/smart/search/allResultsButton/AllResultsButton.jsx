import { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { API_SEARCH, API_DISCOVER, API_WITH_GENRES, API_SORT, API_LTE, API_GTE,
  API_RELEASE_DATE, API_VOTE_AVERAGE, API_VOTE_COUNT, API_FIRST_AIR_DATE } from '../../../../constants/api';

import style from './all-results.module.scss';

const AllResultsButton = ({inputValue, sortBy, genresSelected, years, ratings, mediaType, setInputValue,
  indexSectionBtn, setResults, setGenresSelected, setRatings, setSortBy, setYears, setInputFocus
}) => {
  const language = useSelector(state => state.language.language);

  const type = mediaType[indexSectionBtn];
  const isTypeMovie = type === '/movie';
  const isTypePerson = type === '/person';
  const isValue = sortBy.length || genresSelected.length || ratings.length ||  years.length || inputValue.length;

  const sortUrl = API_SORT+sortBy.slice(1)+API_VOTE_COUNT+API_GTE+15;
  const genresUrl = API_WITH_GENRES+genresSelected.map(({id}) => id);
  const yearsRealeseUrl = API_RELEASE_DATE+API_GTE+years[0]+API_RELEASE_DATE+API_LTE+years[1];
  const yearsFirstUrl = API_FIRST_AIR_DATE+API_GTE+years[0]+API_FIRST_AIR_DATE+API_LTE+years[1];
  const ratingUrl = API_VOTE_AVERAGE+API_GTE+ratings[0]+API_VOTE_AVERAGE+API_LTE+ratings[1];

  const isSort = useMemo(() => sortBy.length ? sortUrl : '', [sortBy, sortUrl]);
  const isGenres = useMemo(() => genresSelected.length ? genresUrl : '' , [genresSelected, genresUrl]);
  const isRating = useMemo(() => ratings.length ? ratingUrl : '' , [ratings, ratingUrl]);
  const isYears = useMemo(() => (
    years.length ? isTypeMovie ? yearsRealeseUrl : yearsFirstUrl : ''
  ), [years, isTypeMovie, yearsRealeseUrl, yearsFirstUrl]);

  const searchPath = `/${language}${type}${API_SEARCH}/${inputValue}/1`;
  const discoverPath = `/${language}${type}${API_DISCOVER}/${isSort}${isGenres}${isRating}${isYears}/1`;

  const link = useMemo(() => {
    if (inputValue) return searchPath;

    if (isValue) {
      if (isTypePerson) return;
      return discoverPath;
    }
  }, [inputValue, isValue, isTypePerson, searchPath, discoverPath]);

  const handleClear = useCallback((e) => {
    setResults(null);
    setGenresSelected([]);
    setRatings([]);
    setYears([]);
    setSortBy([]);
    setInputValue('');
    setInputFocus(false);
  }, [setResults, setGenresSelected, setRatings, setSortBy, setYears, setInputFocus, setInputValue]);

  return (
    <Link
      to={link}
      className={style.btn}
      onClick={handleClear}
    >
      All results
    </Link>
  );
}

export default AllResultsButton;