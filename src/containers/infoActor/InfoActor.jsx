import { useEffect, forwardRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Poster from '../../components/ui/poster/Poster';
import Background from '../../components/ui/background/Background';
import Dates from '../../components/ui/dates/Dates';
import LinkPage from '../../components/ui/linkPage/LinkPage';
import Countries from '../../components/ui/countries/Countries';
import Credits from '../../components/smart/credits/Credits';
import Photos from '../../components/smart/photos/Photos';
import ErrorApi from '../../components/ui/errors/errorApi/ErrorApi';
import Loading from '../../components/ui/loading/Loading';
import Back from '../../components/ui/back/Back';

import { API_ROOT, API_KEY, API_ACTORS, API_LANGUAGE, API_ACTORS_MOVIE_CREDITS, API_ACTORS_TV_CREDITS } from '../../constants/api';
import { setDocumentTitle } from '../../utils/functions';

import style from './info-actor.module.scss';
import { useFetching } from '../../hooks/useFetching';

const moviesTitles = [
  {en: 'Movies', ru: 'Фильмы', uk: 'Фільми'}
];

const tvShowsTitles = [ 
  {en: 'TV Shows', ru: 'Сериалы', uk: 'Серіали'} 
];

const InfoActor = forwardRef((props, ref) => {
  const language = useSelector(state => state.language.language);
  const { id } = useParams();

  const url = `${API_ROOT}${API_ACTORS}/${id}${API_KEY}${API_LANGUAGE}${language}`;
  const moviesUrl = `${API_ROOT}${API_ACTORS}/${id}${API_ACTORS_MOVIE_CREDITS}${API_KEY}${API_LANGUAGE}${language}`;
  const tvShowsUrl = `${API_ROOT}${API_ACTORS}/${id}${API_ACTORS_TV_CREDITS}${API_KEY}${API_LANGUAGE}${language}`;

  const { results, errorApi } = useFetching(url);

  useEffect(() => {
    if (results) {
      setDocumentTitle(results.name && results.name)
    }
  }, [results])

  return (
    <div ref={ref}>
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
                      <LinkPage />
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
    </div>
  );
});

export default InfoActor;