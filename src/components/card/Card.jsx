import { API_POSTER } from '../../constans/api';
import { textOverflow } from '../../utils/functions';

import NoPoster from './img/no-poster.webp';

import { AiFillStar } from 'react-icons/ai';

import style from './card.module.scss';

const Card = ({poster_path, title, original_name, vote_average}) => {
  return (
    <div className={style.card}>
      <div className={style.poster}>
        <img src={poster_path ? API_POSTER+poster_path : NoPoster} alt="Poster" />
      </div>

      {title && <h5>{title && textOverflow(title, 22)}</h5>}
      {original_name && <h5>{original_name && textOverflow(original_name, 22)}</h5>}
      
      <div className={style.rating}>
        <AiFillStar />
        <span>{vote_average}</span>
      </div>
    </div>
  );
}

export default Card;