import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { API_ROOT, API_GENRE, API_LIST, API_KEY, API_LANGUAGE } from '../../constans/api';
import { getApiResources } from '../../service/getApiResources';

import { getGenresFromId } from '../../utils/functions';

import style from './genres.module.scss';

const Genres = ({ type, ids }) => {
  const [results, setResults] = useState(null);
  const [currentGenres, setCurrentGenres] = useState(null);

  const language = useSelector(state => state.language.language);

  const isObj = typeof ids[0] === 'object';

  const url = `${API_ROOT}${API_GENRE}/${type}${API_LIST}${API_KEY}${API_LANGUAGE}${language}`;

  useEffect(() => {
    (async() => {
      const res = await getApiResources(url);
      return res && setResults(res.genres);
    })();
  }, [url, language]);
  
  useEffect(() => {
    if (results) {
      setCurrentGenres(getGenresFromId(results, ids))
    }
  }, [results, language, ids]);

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