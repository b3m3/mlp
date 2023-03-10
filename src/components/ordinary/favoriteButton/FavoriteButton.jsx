import { useState, useCallback, useEffect, useMemo, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';

import { openModal } from '../../../store/slices/authModalSlice';

import { getTypeFromLocation } from '../../../utils/functions';
import { API_ACCOUNT, API_FAVORITE, API_KEY, API_QUERY_SESSION, API_ROOT } from '../../../constants/api';
import { SESSION_ID_KEY } from '../../../constants/localStorage';

import { TiHeartFullOutline } from 'react-icons/ti';

import style from './favorite-button.module.scss';

const styleBtn = {background: 'rgba(243, 46, 46, 0.15)'}

const FavoriteButton = ({ id, type }) => {
  const [isActive, setIsActive] = useState(false);

  const auth = useSelector(state => state.auth.auth);
  const userId = useSelector(state => state.user.userId);
  const favoriteMovies = useSelector(state => state.favorite.favoriteMovies);
  const favoriteTv = useSelector(state => state.favorite.favoriteTv);
  const session_id = secureLocalStorage.getItem(SESSION_ID_KEY);

  const dispatch = useDispatch();

  const currentType = useMemo(() => {
    const path = getTypeFromLocation(window.location.pathname);

    if (path !== '/person' && path !== '/favorites') {
      return path;
    }

    return type;
  }, [type]);

  const url = useMemo(() => {
    const isSession = session_id && session_id !== null && session_id !== 'undefined';

    if (auth && isSession) {
      return API_ROOT+API_ACCOUNT+'/'+userId+API_FAVORITE+API_KEY+API_QUERY_SESSION+session_id;
    }
  }, [userId, session_id, auth]);

  const handleFavorite = useCallback(() => {
    if (auth) {
      setIsActive(a => !a);
      axios.post(url, {
        "media_type": currentType.split('/').pop(),
        "media_id": id,
        "favorite": !isActive
      })
      .catch(err => console.error(err))
    } else {
      dispatch(openModal());
    }
  }, [isActive, currentType, id, url, auth, dispatch]);

  useEffect(() => {
    if (auth) {
      favoriteMovies.map(el => el.id === id && setIsActive(true));
      favoriteTv.map(el => el.id === id && setIsActive(true));
    }
  }, [favoriteTv, favoriteMovies, id, auth]);
  
  return (
    <div 
      className={style.btn}
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