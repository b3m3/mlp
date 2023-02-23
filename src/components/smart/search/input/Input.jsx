import { useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import axios from 'axios';

import { API_SEARCH, API_DISCOVER, API_WITH_GENRES, API_SORT, API_LTE, API_GTE,
  API_RELEASE_DATE, API_VOTE_AVERAGE, API_VOTE_COUNT, API_FIRST_AIR_DATE, API_LANGUAGE,
  API_ROOT, API_KEY, API_QUERY } from '../../../../constants/api';

import { RiSearchLine } from 'react-icons/ri';

import style from './input.module.scss';

const Input = ({mediaType, setInputValue, setInputFocus, indexSectionBtn, inputValue, 
  genresSelected, sortBy, ratings, years, setResults, setGenresSelected, setYears, 
  setSortBy, setRatings
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

  // const searchPath = `/${language}${type}${API_SEARCH}/${inputValue}/1`;
  // const discoverPath = `/${language}${type}${API_DISCOVER}/${isSort}${isGenres}${isRating}${isYears}/1`;

  // const link = useMemo(() => {
  //   if (inputValue) return searchPath;

  //   if (isValue) {
  //     if (isTypePerson) return;
  //     return discoverPath;
  //   }
  // }, [inputValue, isValue, isTypePerson, searchPath, discoverPath]);

  const searchUrl = API_ROOT+API_SEARCH+'/'+type+API_KEY+API_LANGUAGE+language+API_QUERY+inputValue;
  const discoverUrl = API_ROOT+API_DISCOVER+'/'+type+API_KEY+API_LANGUAGE+language+'/'+isSort+isGenres+isRating+isYears;

  const handleClear = useCallback(() => {
    setGenresSelected([]);
    setRatings([]);
    setSortBy([]);
    setYears([]);
  }, [setGenresSelected, setRatings, setSortBy, setYears]);

  useEffect(() => {
    axios({url: inputValue ? searchUrl : !isTypePerson ? discoverUrl : searchUrl})
      .then((data) => {
        if (inputValue || isValue) {
          return setResults(data.data.results.slice(0, 8))
        }
        return setResults(null)
      })
  }, [inputValue, setResults, searchUrl, isTypePerson, isValue, discoverUrl]);

  return (
    <div className={style.wrapp}>
      <input 
        type="text" 
        placeholder={'Enter your request'}
        onChange={e => {
          setInputValue(e.target.value);
          handleClear();
        }}
        onClick={() => setInputFocus(true)}
        value={inputValue}
      /> 
      <RiSearchLine />
    </div>
  );
}

export default Input;