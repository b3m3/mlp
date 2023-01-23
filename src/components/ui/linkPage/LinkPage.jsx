import { useLocation } from 'react-router-dom';

import { IMDB_ROOT, IMDB_ACTOR_ROOT } from '../../../constans/api';
import { getTypeFromLocation } from '../../../utils/functions';

import { FaImdb } from 'react-icons/fa';
import { RiHomeWifiFill } from 'react-icons/ri';

import style from './link-page.module.scss';

const LinkPage = ({ imdb, homepage }) => {
  const { pathname } = useLocation();

  const isPerson = getTypeFromLocation(pathname) === '/person';

  return (
    <>
      {imdb &&
        <a 
          className={style.link}
          href={isPerson ? IMDB_ACTOR_ROOT+imdb : IMDB_ROOT+imdb}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          <FaImdb />
        </a>
      }
      {homepage && 
        <a 
          className={style.link}
          href={homepage} 
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          <RiHomeWifiFill />
        </a>
      }
    </>
  );
}

export default LinkPage;