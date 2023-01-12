import { useState, useEffect, useContext, forwardRef } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';

import Button from '../../components/ui/button/Button';

import { API_ROOT, API_KEY, API_LANGUAGE, API_BACKGROUND } from '../../constans/api';
import { getApiResults } from '../../service/getApiResources';
import { getVideoFromLocation } from '../../utils/functions';

import { Context } from '../../context/context';

import Bd from './img/backdrop.webp';

import style from './details.module.scss';

const Details = forwardRef(({}, ref) => {
  const [results, setResults] = useState(null);
  const [errorApi, setErrorApi] = useState(false);

  const { currentLang } = useContext(Context);
  const { pathname } = useLocation();
  const { videoId } = useParams();
  const navigate = useNavigate();

  const url = `${API_ROOT}${getVideoFromLocation(pathname)}/${videoId}${API_KEY}${API_LANGUAGE}${currentLang}`;
  
  useEffect(() => {
    getApiResults(url, setResults, setErrorApi);
  }, [url]);

  return (
    <section className={style.wrapp} ref={ref}>
      {errorApi
        ? <h2>Error</h2>
        : <>
            {results &&
              <div className={style.body}>
                <h2>details</h2>

                <Link 
                  onClick={() => navigate(-1)}
                >
                  <Button left />
                </Link>
              </div>
            }
          </>
      }
    </section>
  );
})

export default Details;