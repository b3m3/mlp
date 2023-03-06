import { useSelector, useDispatch } from 'react-redux';

import EmptyPage from '../../components/ui/errors/emptyPage/EmptyPage';
import FavoriteList from '../../components/ordinary/favoriteList/FavoriteList';
import { getTitleLang } from '../../utils/functions';

import style from './favorites.module.scss';

const titlesMovie = [
  {en: 'Favorite Movies', uk: 'Обрані фільми', ru: 'Избранные фильмы'}
];

const titlesTv = [
  {en: 'Favorite tv shows', uk: 'Обрані серіали', ru: 'Избранные сериалы'}
];

const Favorites = () => {
  const language = useSelector(state => state.language.language);
  const favoriteMovies = useSelector(state => state.favorite.favoriteMovies);
  const favoriteTv = useSelector(state => state.favorite.favoriteTv);

  const titleMovie = getTitleLang(titlesMovie, language);
  const titleTv = getTitleLang(titlesTv, language);

  const isFavoriteMovies = favoriteMovies && favoriteMovies.length === 0;
  const isFavoriteTv = favoriteTv && favoriteTv.length === 0;

  return (
    <section className={style.wrapp}>
      {isFavoriteMovies && isFavoriteTv 
        ? <EmptyPage />
        : <>
            <FavoriteList 
              results={favoriteMovies} 
              type={'/movie'}
              title={titleMovie}
            />

            <FavoriteList 
              results={favoriteTv}
              type={'/tv'}
              title={titleTv}
            />
          </>
      }
    </section>
  );
}

export default Favorites;