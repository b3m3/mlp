import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearFavorite } from '../../store/slices/favoriteSlice';

import VideoCard from '../../components/ordinary/videoCard/VideoCard';
import EmptyPage from '../../components/ui/errors/emptyPage/EmptyPage';
import { FAVORITE_KEY } from '../../constants/localStorage';
import { removeFromLocalStorage } from '../../utils/localStorage';
import { getTitleLang } from '../../utils/functions';

import style from './favorites.module.scss';

const favoritesTitles = [
  {en: 'Favorites', uk: 'Обране', ru: 'Избранное'}
];

const Favorites = () => {
  const favoriteList = useSelector(state => state.favorite.favoritesList);
  const language = useSelector(state => state.language.language);
  const dispatch = useDispatch();

  const onClearArr = useCallback((e) => {
    if (e.target && favoriteList.length === 1) {
      dispatch(clearFavorite());
      removeFromLocalStorage(FAVORITE_KEY);
    }
  }, [favoriteList, dispatch]);

  return (
    <section className={style.favorites}>
      <h2>{getTitleLang(favoritesTitles, language)}</h2>

      {favoriteList.length > 0
        ? <ul>
            {favoriteList.map(({id, poster_path, vote_average, title, name, type}) => (
              <li key={id} onClick={onClearArr}>
                <VideoCard 
                  id={id}
                  poster_path={poster_path}
                  title={title}
                  name={name}
                  type={type}
                  vote_average={vote_average}
                />
              </li>
            ))}
          </ul>
        : <EmptyPage />
      }
    </section>
  );
}

export default Favorites;