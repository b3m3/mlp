import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFetching } from '../../hooks/useFetching';

import { onActiveInfo } from '../../store/slices/infoSlice';

import Poster from '../../components/ui/poster/Poster';
import Background from '../../components/ui/background/Background';
import Dates from '../../components/ordinary/dates/Dates';
import Links from '../../components/smart/links/Links';
import Countries from '../../components/ordinary/countries/Countries';
import Credits from '../../components/smart/credits/Credits';
import Photos from '../../components/smart/photos/Photos';
import ErrorApi from '../../components/ui/errors/errorApi/ErrorApi';
import Loading from '../../components/ui/loading/Loading';
import Back from '../../components/ui/back/Back';

import { API_ROOT, API_KEY, API_ACTORS, API_LANGUAGE, API_ACTORS_MOVIE_CREDITS, API_ACTORS_TV_CREDITS } from '../../constants/api';
import { setDocumentTitle } from '../../utils/functions';

import style from './info-actor.module.scss';

const moviesTitles = [
  {en: 'Movies', ru: 'Фильмы', uk: 'Фільми'}
];

const tvShowsTitles = [ 
  {en: 'TV Shows', ru: 'Сериалы', uk: 'Серіали'} 
];

const InfoActor = () => {
  const language = useSelector(state => state.language.language);
  const infoState = useSelector(state => state.info.infoState);
  const dispatch = useDispatch();
  const { id } = useParams();

  const url = `${API_ROOT}${API_ACTORS}/${id}${API_KEY}${API_LANGUAGE}${language}`;
  const moviesUrl = `${API_ROOT}${API_ACTORS}/${id}${API_ACTORS_MOVIE_CREDITS}${API_KEY}${API_LANGUAGE}${language}`;
  const tvShowsUrl = `${API_ROOT}${API_ACTORS}/${id}${API_ACTORS_TV_CREDITS}${API_KEY}${API_LANGUAGE}${language}`;

  const { results, errorApi } = useFetching(url);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (results) {
      setDocumentTitle(results.name && results.name)
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
                  <Background path={results.profile_path} />
                  <Back path={-1} />

                  <div className={style.body}>
                    <div className={style.col}>
                      <Poster path={results.profile_path}/>
                    </div>

                    <div className={style.col}>
                      <h1>{results.name && results.name}</h1>
                      <Dates
                        birthday={results.birthday}
                        deathday={results.deathday}
                      />
                      <Countries countries={results.place_of_birth} />
                      <p>{results.biography && results.biography}</p>
                      <Links />
                    </div>
                  </div>

                  <Photos />

                  <Credits 
                    url={moviesUrl}
                    titles={moviesTitles}
                    prevClass={'mov-cre-prev'}
                    nextClass={'mov-cre-next'}
                    resultName={'cast'}
                    fullContainer
                  />
                  <Credits 
                    url={tvShowsUrl}
                    titles={tvShowsTitles}
                    prevClass={'tv-cre-prev'}
                    nextClass={'tv-cre-next'}
                    resultName={'cast'}
                    fullContainer
                  />
                </>
              : <Loading />
            }
          </>
      }
    </section>
  );
}

export default InfoActor;