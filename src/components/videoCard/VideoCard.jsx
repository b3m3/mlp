import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';

import Rating from '../ui/rating/Rating';
import Poster from '../ui/poster/Poster';

import { textOverflow, getTypeFromLocation } from '../../utils/functions';
import { Context } from "../../context/context";

import style from './video-card.module.scss';

const VideoCard = ({id, poster_path, title, category, name, vote_average, small}) => {
  const { pathname } = useLocation();
  const { currentLang } = useContext(Context);

  const isPerson = getTypeFromLocation(pathname) === '/person';

  const link = `/${currentLang}${isPerson ? category : getTypeFromLocation(pathname)}/${id}`;

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

export default VideoCard;