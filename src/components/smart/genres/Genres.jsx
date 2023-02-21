import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetching } from '../../../hooks/useFetching';

import { API_ROOT, API_GENRE, API_LIST, API_KEY, API_LANGUAGE } from '../../../constants/api';

import style from './genres.module.scss';

const Genres = ({ type, ids }) => {
  const [currentGenres, setCurrentGenres] = useState(null);
  const language = useSelector(state => state.language.language);

  const isObj = typeof ids[0] === 'object';

  const url = `${API_ROOT}${API_GENRE}/${type}${API_LIST}${API_KEY}${API_LANGUAGE}${language}`;

  const { results } = useFetching(url);

  const getGenres = useCallback(() => {
    if (results) {
      if (isObj) {
        return results.genres.filter(el1 => ids.some(el2 => el1.id === el2.id));
      }
      return results.genres.filter(el1 => ids.some(el2 => el1.id === el2));
    }
  }, [results, isObj, ids]);
  
  useEffect(() => {
    if (results) {
      setCurrentGenres(getGenres());
    }
  }, [results, language, ids, getGenres]);

  return (
    <ul className={style.list} style={{display: 'flex'}}>
      {currentGenres && currentGenres.map(({id, name}) => (
        <li key={id} style={isObj ? null : {fontSize: '13px'}}>
          {name[0].toUpperCase()+name.slice(1)}
        </li>
      ))}
    </ul>
  );
}

export default Genres;