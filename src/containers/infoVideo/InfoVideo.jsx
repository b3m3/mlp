import { useState, useEffect, useContext, forwardRef } from 'react';
import { useParams } from 'react-router-dom';

import FavoriteButton from '../../components/ui/favoriteButton/FavoriteButton';
import Rating from '../../components/ui/rating/Rating';
import Poster from '../../components/ui/poster/Poster';
import Background from '../../components/ui/background/Background';
import Runtime from '../../components/infoVideo/runtime/Runtime';
import Dates from '../../components/ui/dates/Dates';
import Trailers from '../../components/infoVideo/trailers/Trailers';
import LinkPage from '../../components/ui/linkPage/LinkPage';
import Countries from '../../components/ui/countries/Countries';
import Reviews from '../../components/infoVideo/reviews/Reviews';
import Credits from '../../components/credits/Credits';
import Genres from '../../components/genres/Genres';
import ErrorApi from '../../components/errors/errorApi/ErrorApi';
import Loading from '../../components/loading/Loading';
import Back from '../../components/ui/back/Back';

import { API_ROOT, API_KEY, API_LANGUAGE, API_CREDITS, API_RECOMMEND } from '../../constans/api';
import { getApiResults } from '../../service/getApiResources';

import { Context } from '../../context/context';
import { castTitles, recomendationsTitles } from '../../constans/titles';

import style from './info-video.module.scss';

const InfoVideo = forwardRef((props, ref) => {
  const [results, setResults] = useState(null);
  const [errorApi, setErrorApi] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState(false);

  const { currentLang } = useContext(Context);
  const { type, id } = useParams();

  const bodyBorderRadius = {borderRadius: '0 0 .75rem .75rem'}

  const url = `${API_ROOT}/${type}/${id}${API_KEY}${API_LANGUAGE}${currentLang}`;
  const actorsUrl = `${API_ROOT}/${type}/${id}${API_CREDITS}${API_KEY}${API_LANGUAGE}${currentLang}`;
  const recomendationsUrl = `${API_ROOT}/${type}/${id}${API_RECOMMEND}${API_KEY}${API_LANGUAGE}${currentLang}`;

  useEffect(() => {
    setResults(null);
    getApiResults(url, setResults, setErrorApi);
    setActiveTrailer(false);
  }, [url, id]);

  return (
    <section ref={ref}>
      {errorApi
        ? <ErrorApi navigation />
        : <>
            {results
              ? <>
                  <Background path={results.backdrop_path}/>
                  <Back path={-1}/>
                  
                  <div className='container-800'>
                    <Trailers
                      activeTrailer={activeTrailer}
                      setActiveTrailer={setActiveTrailer}
                    />

                    <div 
                      className={style.body}
                      style={activeTrailer ? bodyBorderRadius : null}
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

                        <Genres ids={results.genres} type={type} />
                        <Countries countries={results.production_countries} />
                        <p>{results.overview && results.overview}</p>

                        <LinkPage />
                      </div>

                      <div className={style.col}>
                        <Poster path={results.poster_path}/>
                        <FavoriteButton 
                          id={parseInt(id)}
                          poster_path={results.poster_path}
                          title={results.title}
                          name={results.name}
                        />
                      </div>
                    </div>

                    <Credits 
                      url={actorsUrl}
                      titles={castTitles}
                      prevClass={'act-cre-prev'}
                      nextClass={'act-cre-next'}
                      resultName={'cast'}
                      actors
                    />
                    <Credits 
                      url={recomendationsUrl}
                      titles={recomendationsTitles}
                      prevClass={'rec-cre-prev'}
                      nextClass={'rec-cre-next'}
                      resultName={'results'}
                    />
                    <Reviews />
                  </div>
                </>
              : <Loading />
            }
          </>
      }
    </section>
  );
})

export default InfoVideo;