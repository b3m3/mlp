import { useState, useCallback, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getTypeFromLocation } from '../../../utils/functions';

import { TiHeartFullOutline } from 'react-icons/ti';

import style from './favorite-button.module.scss';
import axios from 'axios';
import { API_ACCOUNT, API_FAVORITE, API_KEY, API_QUERY_SESSION, API_ROOT } from '../../../constants/api';
import { SESSION_ID_KEY } from '../../../constants/localStorage';

const styleBtn = {background: 'rgba(243, 46, 46, 0.15)'}

const FavoriteButton = ({ id, type }) => {
  const [isActive, setIsActive] = useState(false);
  const userId = useSelector(state => state.user.userId);
  const favoriteMovies = useSelector(state => state.favorite.favoriteMovies);
  const favoriteTv = useSelector(state => state.favorite.favoriteTv);
  const session_id = localStorage.getItem(SESSION_ID_KEY)

  const { pathname } = useLocation();

  const currentType = useMemo(() => {
    const path = getTypeFromLocation(pathname);
    if (path !== '/person' && path !== '/favorites') return path;
    return type;
  }, [pathname, type]);

  const url = useMemo(() => {
    return API_ROOT+API_ACCOUNT+'/'+userId+API_FAVORITE+API_KEY+API_QUERY_SESSION+session_id;
  }, [userId, session_id]);

  const handleFavorite = useCallback((bool) => {
    axios.post(url, {
      "media_type": currentType.split('/').pop(),
      "media_id": id,
      "favorite": bool
    })
    .catch(err => console.error(err))
  }, [currentType, id, url]);

  useEffect(() => {
    if (favoriteMovies && favoriteTv) {
      setIsActive(false);
      favoriteMovies.map(el => el.id === id && setIsActive(true));
      favoriteTv.map(el => el.id === id && setIsActive(true));
    }
  }, [favoriteMovies, favoriteTv, id])

  return (
    <div 
      className={`${style.btn} fav`}
      style={isActive ? styleBtn : null}
      onClick={() => isActive ? handleFavorite(false) : handleFavorite(true)}
    >
      <TiHeartFullOutline
        className={isActive ? style.active : null}
      />
    </div>
  );
};

export default FavoriteButton;