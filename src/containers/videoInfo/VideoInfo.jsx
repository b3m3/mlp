import { useState, useEffect, useContext, forwardRef } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';

import Button from '../../components/ui/button/Button';
import Rating from '../../components/ui/rating/Rating';
import Poster from '../../components/ui/poster/Poster';
import Backdrop from '../../components/videoInfo/backdrop/Backdrop';
import Runtime from '../../components/videoInfo/runtime/Runtime';
import Dates from '../../components/videoInfo/dates/Dates';
import Trailers from '../../components/videoInfo/trailers/Trailers';
import LinkPage from '../../components/videoInfo/linkPage/LinkPage';
import Genres from '../../components/videoInfo/genres/Genres';
import Countries from '../../components/videoInfo/countries/Countries';
import Recommendations from '../../components/videoInfo/recommendations/Recommendations';
import Reviews from '../../components/videoInfo/reviews/Reviews';
import Cast from '../../components/videoInfo/cast/Cast';

import { API_ROOT, API_KEY, API_LANGUAGE } from '../../constans/api';
import { LAST_LOCATION } from '../../constans/localStorage';
import { getApiResults } from '../../service/getApiResources';
import { getVideoFromLocation } from '../../utils/functions';
import { getFromLocalStorage, removeItemFromLocalStorage } from '../../utils/localStorage';

import { Context } from '../../context/context';

import style from './video-info.module.scss';

const VideoInfo = forwardRef((props, ref) => {
  const [results, setResults] = useState(null);
  const [errorApi, setErrorApi] = useState(false);

  const [activeTrailer, setActiveTrailer] = useState(false);

  const { currentLang } = useContext(Context);
  const { pathname } = useLocation();
  const { videoId } = useParams();
  const navigate = useNavigate();

  const bodyBorderRadius = '0 0 .75rem .75rem';

  const url = `${API_ROOT}${getVideoFromLocation(pathname)}/${videoId}${API_KEY}${API_LANGUAGE}${currentLang}`;

  useEffect(() => {
    getApiResults(url, setResults, setErrorApi);
    setActiveTrailer(false);
  }, [url]);

  return (
    <section ref={ref}>
      {results &&
        <>
          <Backdrop backdrop={results.backdrop_path}/>
          
          <Link 
            to={getFromLocalStorage(LAST_LOCATION) && getFromLocalStorage(LAST_LOCATION)}
            onClick={() => {
              !getFromLocalStorage(LAST_LOCATION) && navigate(-1);
              getFromLocalStorage(LAST_LOCATION) && removeItemFromLocalStorage(LAST_LOCATION);
            }}
          >
            <Button left />
          </Link> 
          
          <div className='container-800'>
            <Trailers
              activeTrailer={activeTrailer}
              setActiveTrailer={setActiveTrailer}
            />

            <div 
              className={style.body}
              style={activeTrailer ? {borderRadius: bodyBorderRadius} : null}
            >
              <div className={style.col}>
                <h1>{results.title ? results.title : results.name}</h1>

                <div className={style.row}>
                  <Rating rating={results.vote_average} />
                  <Runtime runtime={results.runtime} episodeRuntime={results.episode_run_time} />
                  <Dates 
                    release={results.release_date} 
                    first={results.first_air_date} 
                    last={results.last_air_date} 
                    status={results.status}
                  />
                </div>

                <Genres genres={results.genres} />
                <Countries countries={results.production_countries} />
                <p>{results.overview && results.overview}</p>

                <div className={style.row}>
                  <LinkPage imdb={results.imdb_id} homepage={results.homepage} />
                </div>
              </div>

              <div className={style.col}>
                <Poster path={results.poster_path}/>
              </div>
            </div>

            <Cast />
            <Recommendations />
            <Reviews />
          </div>
        </>
      }
    </section>
  );
})

export default VideoInfo;