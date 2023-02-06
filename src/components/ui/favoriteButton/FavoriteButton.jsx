import { useState, useContext, useEffect } from 'react';

import { FAVORITE_KEY } from '../../../constans/localStorage';
import { Context } from '../../../context/context';
import { removeItemFromObj } from '../../../utils/functions';
import { addArrToStorage } from '../../../utils/localStorage';

import { BsBookmarkStarFill } from 'react-icons/bs';

import style from './favorite-button.module.scss';

const FavoriteButton = ({ id, poster_path, title, name }) => {
  const [isActive, setIsActive] = useState(false);

  const { favorites, setFavorites } = useContext(Context);

  const activeStyle = { color: 'var(--orange-400)' };

  const data = { [id]: { id, poster_path, title, name } };

  useEffect(() => {
    addArrToStorage(FAVORITE_KEY, favorites);
    setIsActive(false);

    for (const key in favorites) {
      if (favorites[key].id === id) {
        setIsActive(true);
      }
    }
  }, [favorites]);

  return (
    <BsBookmarkStarFill
      className={style.btn}
      style={isActive ? activeStyle : null}
      onClick={() => {
        setIsActive(a => !a);
        
        !isActive
          ? setFavorites(current => ({ ...current, ...data }))
          : removeItemFromObj(favorites, setFavorites, id);
      }}
    />
  );
};

export default FavoriteButton;