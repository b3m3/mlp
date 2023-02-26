import { useCallback, useEffect, forwardRef } from 'react';
import { useFetching } from '../../../hooks/useFetching';
import { Link, useLocation, useParams } from 'react-router-dom';

import { API_ROOT, API_KEY, API_LANGUAGE, API_TV_SHOWS, API_SEASON } from '../../../constants/api';
import { setDocumentTitle } from '../../../utils/functions';
import Poster from '../../ui/poster/Poster';
import Error from '../../ui/errors/error/Error';

import style from './seasons.module.scss';

const Seasons = forwardRef(({ language, id, setBackground, setEpisodeNumber }, ref) => {
  const url = `${API_ROOT}${API_TV_SHOWS}/${id}${API_KEY}${API_LANGUAGE}${language}`;

  const { results, errorApi } = useFetching(url);
  const { pathname } = useLocation();
  const { number } = useParams();

  const activeCardStyle = {borderBottom: '4px solid var(--blue-400)'}

  const link = useCallback((num) => {
    const index = pathname.indexOf(API_SEASON)
    return pathname.slice(0, index) + API_SEASON + '/' + num;
  }, [pathname]);

  const getDate = useCallback((date)  => {
    return date && date.split('-')[0];
  }, []);

  useEffect(() => {
    if (results) {
      setDocumentTitle(results.name);
      setBackground(results.backdrop_path);
    }
  }, [results, setBackground]);

  return (
    <div className={style.wrapp} ref={ref}>
        {errorApi && <Error />}
        <ul>
          {results && results.seasons.map(({id, air_date, name, poster_path, season_number}) => (
            <li key={id}>
              <Link 
                className={style.poster} 
                onClick={() => setEpisodeNumber(0)}
                to={link(season_number)}
                style={+season_number === +number ? activeCardStyle : null}
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
})

export default Seasons;