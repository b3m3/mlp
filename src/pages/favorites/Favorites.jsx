import { useSelector } from 'react-redux';

import { getTitleLang } from '../../utils/functions';

import style from './favorites.module.scss';

const favoritesTitles = [
  {en: 'Favorites', uk: 'Обране', ru: 'Избранное'}
];

const Favorites = () => {
  const language = useSelector(state => state.language.language);

  return (
    <section className={style.favorites}>
      <h2>{getTitleLang(favoritesTitles, language)}</h2>

    </section>
  );
}

export default Favorites;