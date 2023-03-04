import { useState, useCallback, useEffect, useMemo, memo } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { getTypeFromLocation } from '../../../utils/functions';
import { API_ACCOUNT, API_FAVORITE, API_KEY, API_QUERY_SESSION, API_ROOT } from '../../../constants/api';
import { SESSION_ID_KEY } from '../../../constants/localStorage';

import { TiHeartFullOutline } from 'react-icons/ti';

import style from './favorite-button.module.scss';

const styleBtn = {background: 'rgba(243, 46, 46, 0.15)'}

const FavoriteButton = ({ id, type }) => {
  const [isActive, setIsActive] = useState(false);

  const userId = useSelector(state => state.user.userId);
  const favoriteMovies = useSelector(state => state.favorite.favoriteMovies);
  const favoriteTv = useSelector(state => state.favorite.favoriteTv);
  const session_id = localStorage.getItem(SESSION_ID_KEY);

  const currentType = useMemo(() => {
    const path = getTypeFromLocation(window.location.pathname);

    if (path !== '/person' && path !== '/favorites') {
      return path;
    }

    return type;
  }, [type]);

  const url = useMemo(() => {
    return API_ROOT+API_ACCOUNT+'/'+userId+API_FAVORITE+API_KEY+API_QUERY_SESSION+session_id;
  }, [userId, session_id]);

  const handleFavorite = useCallback(() => {
    axios.post(url, {
      "media_type": currentType.split('/').pop(),
      "media_id": id,
      "favorite": !isActive
    })
    .catch(err => console.error(err))
  }, [isActive, currentType, id, url]);

  const checkFavorite = useCallback((arr) => {
    arr.map(el => el.id === id && setIsActive(true));
  }, [id]);

  useEffect(() => {
    setIsActive(false);
    checkFavorite(favoriteMovies);
    checkFavorite(favoriteTv);
  }, [checkFavorite, favoriteTv, favoriteMovies]);
  
  return (
    <div 
      className={`${style.btn} fav`}
      style={isActive ? styleBtn : null}
      onClick={handleFavorite}
    >
      <TiHeartFullOutline
        className={isActive ? style.active : null}
      />
    </div>
  );
};

export default memo(FavoriteButton);