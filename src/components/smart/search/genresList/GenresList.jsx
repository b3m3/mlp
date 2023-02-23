import { useState, useEffect } from 'react';
import axios from 'axios';

import { API_ROOT, API_GENRE, API_LIST, API_KEY, API_LANGUAGE } from '../../../../constants/api';

import GenreButton from '../genreButton/GenreButton';

import style from './genres-list.module.scss';

const GenresList = ({language, indexSectionBtn, activeBtn, setGenresSelected, genresSelected, isActors, mediaType}) => {
  const [results, setResults] = useState(null);

  const url = API_ROOT+API_GENRE+mediaType[indexSectionBtn]+API_LIST+API_KEY+API_LANGUAGE+language;

  useEffect(() => {
    if (!isActors) {
      axios({url:url})
        .then(res => setResults(res.data.genres))
        .catch(() => setResults(null));
    }
  }, [url, language, isActors]);

  return (
    <ul className={style.wrapp}>
      {results && results.map(({ id, name }) => (
        <li key={id}>
          <GenreButton
            id={id} 
            name={name} 
            indexSectionBtn={indexSectionBtn}
            activeBtn={activeBtn}
            setGenresSelected={setGenresSelected}
            genresSelected={genresSelected}
          />
        </li>
      ))}
  </ul>
  );
}

export default GenresList;