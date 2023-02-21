import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFetching } from '../../hooks/useFetching';

import { onActiveInfo } from '../../store/slices/infoSlice';

import FavoriteButton from '../../components/ordinary/favoriteButton/FavoriteButton';
import Rating from '../../components/ordinary/rating/Rating';
import Poster from '../../components/ui/poster/Poster';
import Background from '../../components/ui/background/Background';
import Runtime from '../../components/ordinary/runtime/Runtime';
import Dates from '../../components/ordinary/dates/Dates';
import Trailers from '../../components/smart/trailers/Trailers';
import Links from '../../components/smart/links/Links';
import Countries from '../../components/ordinary/countries/Countries';
import Reviews from '../../components/smart/reviews/Reviews';
import Credits from '../../components/smart/credits/Credits';
import Genres from '../../components/smart/genres/Genres';
import ErrorApi from '../../components/ui/errors/errorApi/ErrorApi';
import Loading from '../../components/ui/loading/Loading';
import Votes from '../../components/ordinary/votes/Votes';
import Back from '../../components/ui/back/Back';

import { API_ROOT, API_KEY, API_LANGUAGE, API_CREDITS, API_RECOMMEND } from '../../constants/api';
import { setDocumentTitle } from '../../utils/functions';

import style from './info-video.module.scss';

const castTitles = [
  {en: 'Cast', ru: 'В ролях', uk: 'Акторський склад'}
];

const recomendationsTitles = [
  {en: 'Recommendations', ru: 'Рекомендации', uk: 'Рекомендації'}
];

const InfoVideo = () => {
  const [activeTrailer, setActiveTrailer] = useState(false);

  const language = useSelector(state => state.language.language);
  const infoState = useSelector(state => state.info.infoState);
  const dispatch = useDispatch();
  const { type, id } = useParams();

  const bodyBorderRadius = {borderRadius: '0 0 .75rem .75rem'}

  const url = `${API_ROOT}/${type}/${id}${API_KEY}${API_LANGUAGE}${language}`;
  const actorsUrl = `${API_ROOT}/${type}/${id}${API_CREDITS}${API_KEY}${API_LANGUAGE}${language}`;
  const recomendationsUrl = `${API_ROOT}/${type}/${id}${API_RECOMMEND}${API_KEY}${API_LANGUAGE}${language}`;

  const { results, setResults, errorApi } = useFetching(url);

  useEffect(() => {
    setResults(null);
    setActiveTrailer(false);
  }, [setResults, url, id]);

  useEffect(() => {
    if (results) {
      setDocumentTitle(results.title ? results.title : results.name)
    }
  }, [results]);

  useEffect(() => {
    dispatch(onActiveInfo());
  }, [dispatch, infoState, id])

  return (
    <section>
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
                          <Votes vote_count={results.vote_count} />
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
                        <Links />
                      </div>

                      <div className={style.col}>
                        <Poster path={results.poster_path}/>
                        <FavoriteButton 
                          id={parseInt(id)}
                          poster_path={results.poster_path}
                          title={results.title}
                          name={results.name}
                          vote_average={results.vote_average}
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
}

export default InfoVideo;