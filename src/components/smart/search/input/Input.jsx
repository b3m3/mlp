import { useEffect, useCallback } from 'react';
import axios from 'axios';

import { API_SEARCH, API_DISCOVER, API_LANGUAGE, API_ROOT, API_KEY, API_QUERY } from '../../../../constants/api';

import { RiSearchLine } from 'react-icons/ri';

import style from './input.module.scss';

const Input = ({language, type, isValue, isActors, isSort, isGenres, isRating, isYears, setInputValue,
  setInputFocus, inputValue, setRatings, setResults, setGenresSelected, setYears, setSortBy
}) => {
  const searchUrl = API_ROOT+API_SEARCH+'/'+type+API_KEY+API_LANGUAGE+language+API_QUERY+inputValue;
  const discoverUrl = API_ROOT+API_DISCOVER+'/'+type+API_KEY+API_LANGUAGE+language+'/'+isSort+isGenres+isRating+isYears;

  const handleClear = useCallback(() => {
    setGenresSelected([]);
    setRatings([]);
    setSortBy([]);
    setYears([]);
  }, [setGenresSelected, setRatings, setSortBy, setYears]);

  useEffect(() => {
    axios({url: inputValue ? searchUrl : !isActors ? discoverUrl : searchUrl})
      .then((data) => {
        if (inputValue || isValue) {
          return setResults(data.data.results.slice(0, 8))
        }
        return setResults(null)
      })
  }, [inputValue, setResults, searchUrl, isActors, isValue, discoverUrl]);

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