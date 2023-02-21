import { useLocation, useParams } from 'react-router-dom';

import { API_ROOT, API_KEY, IMDB_ROOT, IMDB_ACTOR_ROOT } from '../../../constants/api';
import { getTypeFromLocation } from '../../../utils/functions';

import { FaImdb } from 'react-icons/fa';
import { RiHomeWifiFill } from 'react-icons/ri';

import style from './link-page.module.scss';
import { useFetching } from '../../../hooks/useFetching';

const LinkPage = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const type = getTypeFromLocation(pathname);

  const isPerson = getTypeFromLocation(pathname) === '/person';

  const url = `${API_ROOT}/${type}/${id}${API_KEY}`;

  const { results } = useFetching(url);

  return (
    <div className={style.wrapp}>
      {results && results.imdb_id &&
        <a 
          className={style.link}
          href={isPerson ? IMDB_ACTOR_ROOT+results.imdb_id : IMDB_ROOT+results.imdb_id}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          <FaImdb />
        </a>
      }
      {results && results.homepage && 
        <a
          className={style.link}
          href={results.homepage}
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