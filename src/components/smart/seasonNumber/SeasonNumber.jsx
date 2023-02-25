import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFetching } from '../../../hooks/useFetching';

import { API_ROOT, API_KEY, API_LANGUAGE, API_TV_SHOWS, API_SEASON } from '../../../constants/api';

import Poster from '../../ui/poster/Poster';
import Episodes from '../episodes/Episodes';
import EpisodesButtons from '../episodesButtons/EpisodesButtons';
import Error from '../../ui/errors/error/Error';

import style from './season-number.module.scss';

const SeasonNumber = ({ id, language, episodeNumber, setEpisodeNumber }) => {
  const [numberButtons, setNumberButtons] = useState(null);

  const { number } = useParams();
  
  const url = `${API_ROOT}${API_TV_SHOWS}/${id}${API_SEASON}/${number}${API_KEY}${API_LANGUAGE}${language}`;
  
  const { results, errorApi } = useFetching(url);
  
  useEffect(() => {
    if (results) {
      setNumberButtons(results.episodes.length)
    }
  }, [results])
  
  const title = results ? results.name : number;

  return (
    <div className={style.wrapp}>
      {errorApi && <Error />}
      {results &&
        <>
          <div className={style.col}>
            <div className={style.poster}>
              <Poster path={results.poster_path} />
            </div>
            <div className={style.info}>
              <h2>{title}</h2>
              {results.overview && <p>{results.overview}</p>}
              <EpisodesButtons 
                number={numberButtons} 
                language={language} 
                episodeNumber={episodeNumber}
                setEpisodeNumber={setEpisodeNumber}
              />
            </div>
          </div>

          <Episodes 
            results={results.episodes} 
            episodeNumber={episodeNumber}
          />
        </>
      }
    </div>
  );
}

export default SeasonNumber;