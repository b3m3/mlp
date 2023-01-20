import { API_POSTER } from '../../../constans/api';

import NoPoster from './img/no-poster.webp';

import style from './poster.module.scss';

const Poster = ({ path }) => {
  return (
    <img 
      src={
        path
          ? path.indexOf('http') === 1 ? path.slice(1) : API_POSTER+path
          : NoPoster
      }
      alt="poster"
      className={style.img}
    />
  );
}

export default Poster;