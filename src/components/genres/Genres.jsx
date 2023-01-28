import { useEffect, useState, useContext } from 'react';
import { API_ROOT, API_GENRE, API_LIST, API_KEY, API_LANGUAGE } from '../../constans/api';
import { getApiResources } from '../../service/getApiResources';

import { Context } from '../../context/context';
import { getGenresFromId } from '../../utils/functions';

import style from './genres.module.scss';

const Genres = ({ type, ids }) => {
  const [results, setResults] = useState(null);
  const [genresList, setGenresList] = useState(null);

  const { currentLang } = useContext(Context);

  const isObj = typeof ids[0] === 'object';

  const url = `${API_ROOT}${API_GENRE}/${type}${API_LIST}${API_KEY}${API_LANGUAGE}${currentLang}`;

  useEffect(() => {
    (async() => {
      const res = await getApiResources(url);
      return res && setResults(res.genres);
    })();
  }, [url, currentLang]);
  
  useEffect(() => {
    if (results) {
      setGenresList(getGenresFromId(results, ids))
    }
  }, [results, currentLang]);

  return (
    <ul className={style.list} style={{display: 'flex'}}>
      {genresList && genresList.map(({id, name}) => (
        <li key={id} style={isObj ? null : {fontSize: '13px'}}>
          {name[0].toUpperCase()+name.slice(1)}
        </li>
      ))}
    </ul>
  );
}

export default Genres;