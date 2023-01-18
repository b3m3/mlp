import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';

import Rating from '../ui/rating/Rating';
import Poster from '../ui/poster/Poster';

import { API_POSTER } from '../../constans/api';
import { LAST_LOCATION } from '../../constans/localStorage';
import { textOverflow, getVideoFromLocation } from '../../utils/functions';
import { Context } from "../../context/context";
import { addToLocalStorage } from '../../utils/localStorage';



import style from './card.module.scss';

const Card = ({id, poster_path, title, name, vote_average}) => {
  const { pathname } = useLocation();
  const { currentLang } = useContext(Context);

  const link = `/${currentLang}${getVideoFromLocation(pathname)}/${id}`;

  return (
    <div className={style.card}>
      <div 
        className={style.poster}
        onClick={() => addToLocalStorage(LAST_LOCATION, pathname)}
      >
        <Link 
          to={link}
        >
          <Poster path={poster_path} />
        </Link>
      </div>

      <h5>
        {title ? textOverflow(title, 22) : textOverflow(name, 22)}
      </h5>
      
      <Rating rating={vote_average} />
    </div>
  );
}

export default Card;