import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { FAVORITE_KEY } from '../../../constans/localStorage';
import { Context } from '../../../context/context';
import { addArrToStorage } from '../../../utils/localStorage';
import { getTypeFromLocation } from '../../../utils/functions';

import { BsBookmarkStarFill } from 'react-icons/bs';

import style from './favorite-button.module.scss';

const FavoriteButton = ({ id, poster_path, title, name }) => {
  const [isActive, setIsActive] = useState(false);

  const { favorites, setFavorites } = useContext(Context);
  const { pathname } = useLocation();

  const activeStyle = { color: 'var(--orange-400)' };

  const type = getTypeFromLocation(pathname);
  const data = { id, poster_path, title, name, type };

  useEffect(() => {
    addArrToStorage(FAVORITE_KEY, favorites);
    setIsActive(false);

    favorites.map(el => {
      if (el.id === id) {
        setIsActive(true);
      }
    });
  }, [favorites]);

  return (
    <BsBookmarkStarFill
      className={style.btn}
      style={isActive ? activeStyle : null}
      onClick={() => {
        setIsActive(a => !a);
        
        !isActive
          ? setFavorites(current => [...current, data])
          : setFavorites(current => current.filter(el => el.id !== id ));
      }}
    />
  );
};

export default FavoriteButton;