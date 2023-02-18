import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Rating from '../ui/rating/Rating';
import Poster from '../ui/poster/Poster';
import FavoriteButton from '../ui/favoriteButton/FavoriteButton';

import { getTypeFromLocation } from '../../utils/functions';

import style from './video-card.module.scss';

const VideoCard = ({id, poster_path, title, name, type, vote_average, small}) => {
  const { pathname } = useLocation();
  const language = useSelector(state => state.language.language);

  const currentType = getTypeFromLocation(pathname);
  const isPerson = currentType === '/person';
  const isFavorites = currentType === '/favorites';

  const favoriteBtnProps = {id, poster_path, title, name, vote_average}

  const link = `/${language}${isPerson || isFavorites ? type : currentType}/${id}`;

  return (
    <div className={style.card}>
      <div className={style.img}>
        <Link to={link}>
          <Poster path={poster_path} />
        </Link>
      </div>

      <FavoriteButton {...favoriteBtnProps} />

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