import { IMDB_ROOT } from '../../../constans/api';

import { FaImdb } from 'react-icons/fa';
import { RiHomeWifiFill } from 'react-icons/ri';

import style from './link-page.module.scss';

const LinkPage = ({ imdb, homepage }) => {
  return (
    <>
      {imdb &&
        <a 
          className={style.link}
          href={IMDB_ROOT+imdb} 
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