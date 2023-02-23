import { useCallback } from 'react';

import Card from '../card/Card';

import style from './cards-list.module.scss';

const CardsList = ({
  results, isActors, type, setResults, setGenresSelected,
  setRatings, setYears, setSortBy, setInputFocus, setInputValue
}) => {
  const handleClear = useCallback((e) => {
    if (e.target && e.target.tagName.toLowerCase() === 'img') {
      setResults(null);
      setGenresSelected([]);
      setRatings([]);
      setYears([]);
      setSortBy([]);
      setInputFocus(false);
      setInputValue('');
    }
  }, [setResults, setGenresSelected, setRatings, setSortBy, setYears, setInputFocus, setInputValue]);

  return (
    <ul className={style.wrapp}>
      {results.map(({id, poster_path, profile_path}) => (
        <li key={id} onClick={e => handleClear(e)}>
          <Card
            id={id}
            poster_path={isActors ? profile_path : poster_path}
            type={type}
          />
        </li>
      ))}
    </ul>
  );
}

export default CardsList;