import { useState, useEffect, useContext, forwardRef } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';

import Button from '../../components/ui/button/Button';
import Rating from '../../components/ui/rating/Rating';
import Poster from '../../components/ui/poster/Poster';
import Backdrop from '../../components/details/backdrop/Backdrop';
import Runtime from '../../components/details/runtime/Runtime';
import Dates from '../../components/details/dates/Dates';
import Trailer from '../../components/details/trailer/Trailer';
import LinkPage from '../../components/details/linkPage/LinkPage';
import Genres from '../../components/details/genres/Genres';
import Countries from '../../components/details/countries/Countries';

import { API_ROOT, API_KEY, API_LANGUAGE, API_VIDEOS } from '../../constans/api';
import { LAST_LOCATION } from '../../constans/localStorage';
import { getApiResults, getApiResources } from '../../service/getApiResources';
import { getVideoFromLocation } from '../../utils/functions';
import { getFromLocalStorage } from '../../utils/localStorage';

import { Context } from '../../context/context';

import style from './details.module.scss';

const Details = forwardRef((props, ref) => {
  const [results, setResults] = useState(null);
  const [errorApi, setErrorApi] = useState(false);
  
  const [trailers, setTrailers] = useState(null);
  const [totalTrailers, setTotalTrailers] = useState(null);
  const [trailerNumber, setTrailerNumber] = useState(0);
  const [activeTrailer, setActiveTrailer] = useState(false);

  const { currentLang } = useContext(Context);
  const { pathname } = useLocation();
  const { mediaType, videoId } = useParams();
  const navigate = useNavigate();

  const bodyBorderRadius = '0 0 .75rem .75rem';

  const urlResults = `${API_ROOT}${getVideoFromLocation(pathname)}/${videoId}${API_KEY}${API_LANGUAGE}${currentLang}`;
  const urlTrailers = `${API_ROOT}/${mediaType}/${videoId}${API_VIDEOS}${API_KEY}${API_LANGUAGE}${currentLang}`;

  useEffect(() => {
    getApiResults(urlResults, setResults, setErrorApi);
  }, [urlResults]);
  
  useEffect(() => {
    (async() => {
      const res = await getApiResources(urlTrailers);

      if (res) {
        setTotalTrailers(res.results.length);
        setTrailerNumber(0);
        setTrailers(res.results);
      }
    })();
  }, [urlTrailers, currentLang]);

  return (
    <section className={style.details} ref={ref}>
      {results &&
        <>
          <Backdrop backdrop={results.backdrop_path}/>
          
          <div className="container">
            <Link 
              to={getFromLocalStorage(LAST_LOCATION) && getFromLocalStorage(LAST_LOCATION)}
              onClick={() => {!getFromLocalStorage(LAST_LOCATION) && navigate(-1)}}
            >
              <Button left />
            </Link> 
            
            <div 
              className={`
                ${style.trailer_wrapp}
                ${activeTrailer && trailers.length > 0 && style.active}
              `}
            >
              {trailers && trailers.length > 0 &&
                <Trailer 
                  videoKey={trailers[trailerNumber].key}
                  isActive={activeTrailer}
                  totalTrailers={totalTrailers}
                  trailerNumber={trailerNumber}
                  onActive={() => setActiveTrailer(true)}
                  prevTrailer={() => {trailerNumber > 0 && setTrailerNumber(trailerNumber -1)}}
                  nextTrailer={() =>
                    totalTrailers && trailerNumber < (totalTrailers -1) && 
                    setTrailerNumber(trailerNumber +1)
                  }
                  onClose={() => setActiveTrailer(false)}
                />
              }
            </div>

            <div 
              className={style.body}
              style={activeTrailer && trailers.length > 0 ? {borderRadius: bodyBorderRadius} : null}
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
          </div>

          
        </>
      }
    </section>
  );
})

export default Details;