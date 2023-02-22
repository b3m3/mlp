import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../../store/slices/favoriteSlice';


import { FAVORITE_KEY } from '../../../constants/localStorage';
import { addArrToLocalStorage } from '../../../utils/localStorage';
import { getTypeFromLocation } from '../../../utils/functions';

import { TiHeartFullOutline } from 'react-icons/ti';

import style from './favorite-button.module.scss';

const styleBtn = {background: 'rgba(243, 46, 46, 0.15)'}

const FavoriteButton = ({ id, poster_path, vote_average, title, name, type }) => {
  const [isActive, setIsActive] = useState(false);

  const favoriteList = useSelector(state => state.favorite.favoritesList)
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const currentType = getTypeFromLocation(pathname) !== '/person' ? getTypeFromLocation(pathname) : type;

  const data = {id, poster_path, vote_average, title, name, type: currentType};

  const toggleActive = useCallback(() => {
    return setIsActive(a => !a);
  }, [setIsActive]);

  useEffect(() => {
    addArrToLocalStorage(FAVORITE_KEY, favoriteList);
    setIsActive(false);

    favoriteList.map(el => el.id === id && setIsActive(true));
  }, [id, favoriteList]);

  return (
    <div 
      className={style.btn}
      style={isActive ? styleBtn : null}
      onClick={() => {
        toggleActive()
        isActive ? dispatch(removeFavorite(id)) : dispatch(addFavorite(data))
      }}
    >
      <TiHeartFullOutline
        className={isActive ? style.active : null}
      />
    </div>
  );
};

export default FavoriteButton;