import { useCallback, useEffect } from 'react';
import { useFetching } from '../../../hooks/useFetching';
import { Link, useLocation } from 'react-router-dom';

import { API_ROOT, API_KEY, API_LANGUAGE, API_TV_SHOWS, API_SEASON } from '../../../constants/api';
import Poster from '../../ui/poster/Poster';
import Error from '../../ui/errors/error/Error';

import style from './seasons.module.scss';

const Seasons = ({ language, id, setBackground, setEpisodeNumber }) => {
  const url = `${API_ROOT}${API_TV_SHOWS}/${id}${API_KEY}${API_LANGUAGE}${language}`;

  const { results, errorApi } = useFetching(url);
  const { pathname } = useLocation();

  const link = useCallback((num) => {
    const index = pathname.indexOf(API_SEASON)
    return pathname.slice(0, index) + API_SEASON + '/' + num;
  }, [pathname]);

  const getDate = useCallback((date)  => {
    return date && date.split('-')[0];
  }, []);

  useEffect(() => {
    if (results) {
      setBackground(results.backdrop_path);
    }
  }, [results, setBackground]);

  return (
    <div className={style.wrapp}>
        {errorApi && <Error />}
        <ul>
          {results && results.seasons.map(({id, air_date, name, poster_path, season_number}) => (
            <li key={id}>
              <Link 
                className={style.poster} 
                onClick={() => setEpisodeNumber(0)}
                to={link(season_number)}
              >
                <Poster path={poster_path} />
              </Link>
              <p>
                {name}
                {air_date && <span>({getDate(air_date)})</span>}
              </p>
            </li>
          ))}
        </ul>
    </div>
  );
}

export default Seasons;