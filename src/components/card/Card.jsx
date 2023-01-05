import { API_POSTER } from '../../constans/api';

import { AiFillStar } from 'react-icons/ai';

import style from './card.module.scss';

const Card = ({poster_path, title, vote_average}) => {
  return (
    <div className={style.card}>
      <div className={style.poster}>
        <img src={API_POSTER+poster_path} alt="Poster" />
      </div>

      <p>{title}</p>
      <div className={style.rating}>
        <AiFillStar />
        <span>{vote_average}</span>
      </div>
    </div>
  );
}

export default Card;