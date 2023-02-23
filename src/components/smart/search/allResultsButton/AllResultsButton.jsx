import { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { API_SEARCH, API_DISCOVER } from '../../../../constants/api';

import style from './all-results.module.scss';

const AllResultsButton = ({language, type, isValue, isActors, isSort, isGenres, isRating, isYears, inputValue,
  setInputValue,setResults, setGenresSelected, setRatings, setSortBy, setYears, setInputFocus
}) => {
  const searchPath = `/${language}${type}${API_SEARCH}/${inputValue}/1`;
  const discoverPath = `/${language}${type}${API_DISCOVER}/${isSort}${isGenres}${isRating}${isYears}/1`;

  const link = useMemo(() => {
    if (inputValue) return searchPath;

    if (isValue) {
      if (isActors) return;
      return discoverPath;
    }
  }, [inputValue, isValue, isActors, searchPath, discoverPath]);

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