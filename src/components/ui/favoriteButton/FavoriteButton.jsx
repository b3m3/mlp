import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { FAVORITE_KEY } from '../../../constans/localStorage';
import { Context } from '../../../context/context';
import { addArrToStorage } from '../../../utils/localStorage';
import { getTypeFromLocation } from '../../../utils/functions';

import { TiHeartFullOutline } from 'react-icons/ti';

import style from './favorite-button.module.scss';

const FavoriteButton = ({ id, poster_path, vote_average, title, name }) => {
  const [isActive, setIsActive] = useState(false);

  const { favorites, setFavorites } = useContext(Context);
  const { pathname } = useLocation();

  const type = getTypeFromLocation(pathname);
  const data = { id, poster_path, vote_average, title, name, type };

  useEffect(() => {
    addArrToStorage(FAVORITE_KEY, favorites);
    setIsActive(false);

    favorites.map(el => el.id === id && setIsActive(true));
  }, [id, favorites]);

  console.log(favorites);

  return (
    <div className={style.btn}>
      <TiHeartFullOutline
        className={isActive ? style.active : ''}
        onClick={() => {
          setIsActive(a => !a);

          isActive 
            ? setFavorites(favorites.filter(el => el.id !== id ))
            : setFavorites([...favorites, data])
        }}
      />
    </div>
  );
};

export default FavoriteButton;