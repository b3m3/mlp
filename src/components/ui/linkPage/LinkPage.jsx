import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { API_ROOT, API_KEY, IMDB_ROOT, IMDB_ACTOR_ROOT } from '../../../constans/api';
import { getTypeFromLocation } from '../../../utils/functions';
import { getApiItem } from '../../../service/getApiResources';

import { FaImdb } from 'react-icons/fa';
import { RiHomeWifiFill } from 'react-icons/ri';

import style from './link-page.module.scss';

const LinkPage = () => {
  const [homeLink, setHomeLink] = useState(null);
  const [imdbLink, setImdbLink] = useState(null);

  const { pathname } = useLocation();
  const { id } = useParams();
  const type = getTypeFromLocation(pathname);

  const isPerson = getTypeFromLocation(pathname) === '/person';

  const url = `${API_ROOT}/${type}/${id}${API_KEY}`;

  useEffect(() => {
    getApiItem(url, 'homepage', setHomeLink);
    getApiItem(url, 'imdb_id', setImdbLink);
  }, [url]);

  return (
    <div className={style.wrapp}>
      {imdbLink &&
        <a 
          className={style.link}
          href={isPerson ? IMDB_ACTOR_ROOT+imdbLink : IMDB_ROOT+imdbLink}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          <FaImdb />
        </a>
      }
      {homeLink && 
        <a 
          className={style.link}
          href={homeLink} 
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          <RiHomeWifiFill />
        </a>
      }
    </div>
  );
}

export default LinkPage;