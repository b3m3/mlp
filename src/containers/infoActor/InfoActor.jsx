import { useState, useEffect, useContext, forwardRef } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';

import Button from '../../components/ui/button/Button';
import Poster from '../../components/ui/poster/Poster';
import Backdrop from '../../components/ui/backdrop/Backdrop';
import Dates from '../../components/ui/dates/Dates';
import LinkPage from '../../components/ui/linkPage/LinkPage';
import Countries from '../../components/ui/countries/Countries';

import { API_ROOT, API_KEY, API_LANGUAGE } from '../../constans/api';
import { getApiResults } from '../../service/getApiResources';
import { getTypeFromLocation } from '../../utils/functions';

import { Context } from '../../context/context';

import style from './info-actor.module.scss';

const InfoActor = forwardRef((props, ref) => {
  const [results, setResults] = useState(null);
  const [errorApi, setErrorApi] = useState(false);

  const { currentLang } = useContext(Context);
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const url = `${API_ROOT}${getTypeFromLocation(pathname)}/${id}${API_KEY}${API_LANGUAGE}${currentLang}`;

  useEffect(() => {
    getApiResults(url, setResults, setErrorApi);
  }, [url]);

  return (
    <div ref={ref}>
      {results &&
        <>
          <Backdrop backdrop={results.profile_path} />
          
          <Link onClick={() => navigate(-1)}>
            <Button left />
          </Link>

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
              <LinkPage imdb={results.imdb_id} />
            </div>
          </div>
        </>
      }
    </div>
  );
});

export default InfoActor;