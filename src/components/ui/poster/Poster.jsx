import { API_POSTER } from '../../../constants/api';

import NoPoster from './img/no-poster.webp';

import style from './poster.module.scss';

const Poster = ({ path }) => {
  const src = path ? path.indexOf('http') === 1 ? path.slice(1) : API_POSTER+path : NoPoster;

  return (
    <img 
      src={src}
      alt="poster"
      className={style.img}
    />
  );
}

export default Poster;