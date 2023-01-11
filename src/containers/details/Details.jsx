import { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import Button from '../../components/ui/button/Button';

import { API_ROOT, API_KEY, API_LANGUAGE, API_BACKGROUND } from '../../constans/api';
import { getApiResults } from '../../service/getApiResources';

import { Context } from '../../context/context';

import Bd from './img/backdrop.webp';

import style from './details.module.scss';

const Details = () => {
  const [results, setResults] = useState(null);
  const [errorApi, setErrorApi] = useState(false);

  const { currentLang } = useContext(Context);
  const { pathname } = useLocation();
  const { id } = useParams();
  
  useEffect(() => {
  }, []);

  return (
    <section className={style.wrapp}>
      {/* {errorApi
        ? <h2>Error</h2>
        : <>
            {results &&
              <div className={style.body}>
                <h2>details</h2>
              </div>
            }
          </>
      } */}
      <h2>details</h2>
    </section>
  );
}

export default Details;