import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';

import Rating from '../ui/rating/Rating';
import Poster from '../ui/poster/Poster';

import { textOverflow, getTypeFromLocation } from '../../utils/functions';
import { Context } from "../../context/context";

import style from './card.module.scss';

const Card = ({id, poster_path, title, name, vote_average, small}) => {
  const { pathname } = useLocation();
  const { currentLang } = useContext(Context);

  const link = `/${currentLang}${getTypeFromLocation(pathname)}/${id}`;

  return (
    <div className={style.card}>
      <div 
        className={`${style.poster} ${small && style.small}`}
      >
        <Link 
          to={link}
        >
          <Poster path={poster_path} />
        </Link>
      </div>

      {!small &&
        <>
          <h5>
            {title ? textOverflow(title, 22) : textOverflow(name, 22)}
          </h5>
          
          <Rating rating={vote_average} />
        </>      
      }
    </div>
  );
}

export default Card;