import { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import Button from '../../components/ui/button/Button';

import { API_ROOT, API_KEY, API_LANGUAGE, API_BACKGROUND } from '../../constans/api';
import { getApiResults } from '../../service/getApiResources';
import { getVideoPathname } from '../../utils/functions';

import { Context } from '../../context/context';

import Bd from './img/backdrop.webp';

import style from './details.module.scss';

const Details = () => {
  const [results, setResults] = useState(null);
  const [errorApi, setErrorApi] = useState(false);

  const { currentLang } = useContext(Context);
  const { langCode } = currentLang;
  const { pathname } = useLocation();
  const { id } = useParams();
  
  const url = API_ROOT+getVideoPathname(pathname)+'/'+id+API_KEY+API_LANGUAGE+langCode;
  
  useEffect(() => {
    getApiResults(url, setResults, setErrorApi);
  }, [url]);

  return (
    <section className={style.wrapp}>
      {errorApi
        ? <h2>Error</h2>
        : <>
            {results &&
              <div className={style.body}>
                <div className={style.backdrop_poster}>
                  <img src={results.backdrop_path ? API_BACKGROUND+results.backdrop_path : Bd} alt="bg" />
                  <span></span>
                </div>

                <Link>
                  <Button left />
                </Link>

                <h1>{results.title}</h1>
              </div>
            }
          </>
      }
    </section>
  );
}

export default Details;