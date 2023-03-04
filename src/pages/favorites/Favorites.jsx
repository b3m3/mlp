import { useSelector } from 'react-redux';

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

  const titleMovie = getTitleLang(titlesMovie, language)
  const titleTv = getTitleLang(titlesTv, language)

  return (
    <section className={style.wrapp}>
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
    </section>
  );
}

export default Favorites;