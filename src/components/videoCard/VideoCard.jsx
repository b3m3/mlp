import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';

import Rating from '../ui/rating/Rating';
import Poster from '../ui/poster/Poster';
import FavoriteButton from '../ui/favoriteButton/FavoriteButton';

import { getTypeFromLocation } from '../../utils/functions';
import { Context } from "../../context/context";

import style from './video-card.module.scss';

const VideoCard = ({id, poster_path, title, name, category, vote_average, small}) => {
  const { pathname } = useLocation();
  const { currentLang } = useContext(Context);

  const isPerson = getTypeFromLocation(pathname) === '/person';

  const link = `/${currentLang}${isPerson ? category : getTypeFromLocation(pathname)}/${id}`;

  return (
    <div className={style.card}>
      <div className={style.img}>
        <Link to={link}>
          <Poster path={poster_path} />
        </Link>
      </div>

      <div className={style.favorite}>
        <FavoriteButton 
          id={id}
          poster_path={poster_path}
          title={title}
          name={name}
        />
      </div>

      {!small &&
        <>
          <h5>{title ? title : name}</h5>
          <Rating rating={vote_average} />
        </>
      }
    </div>
  );
}

export default VideoCard;