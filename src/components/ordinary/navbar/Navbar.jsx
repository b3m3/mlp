import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { AiFillHome } from 'react-icons/ai';
import { MdLocalMovies } from 'react-icons/md';
import { RiMovie2Fill } from 'react-icons/ri';
import { MdFavorite } from 'react-icons/md';
import { BsFillPeopleFill } from 'react-icons/bs';

import style from './navbar.module.scss';

const Navbar = ({ sidebar }) => {
  const menuState = useSelector(state => state.menu.menuState);
  const language = useSelector(state => state.language.language);
  const favoriteMovies = useSelector(state => state.favorite.favoriteMovies);
  const favoriteTv = useSelector(state => state.favorite.favoriteTv);

  const isFavorite = favoriteMovies && favoriteTv && (favoriteMovies.length > 0 || favoriteTv.length > 0);
  const favoriteCount = isFavorite && favoriteMovies.length + favoriteTv.length;

  const links = useMemo(() => [
    {
      icon: <AiFillHome />, 
      path: `/${language}`, 
      end: true,
      name: {en: 'Home', uk: 'Домашня', ru: 'Домашняя'}
    },
    {
      icon: <MdLocalMovies />, 
      path: `/${language}/movie`,
      name: {en: 'Movies', uk: 'Фільми', ru: 'Фильмы'}
    },
    {
      icon: <RiMovie2Fill />, 
      path: `/${language}/tv`,
      name: {en: 'TV Shows', uk: 'Серіали', ru: 'Сериалы'}
    },
    {
      icon: <BsFillPeopleFill />, 
      path: `/${language}/person`,
      name: {en: 'Actors', uk: 'Актори', ru: 'Актеры'}
    },
    {
      icon: <MdFavorite />, 
      path: `/${language}/favorites`,
      name: {en: 'Favorites', uk: 'Обране', ru: 'Избранное'}
    }
  ], [language]);

  return (
    <nav className={style.wrapp}>
      <ul className={sidebar ? style.list : null}>
        {links.map(({name, path, icon, end}, i) => (
          <li key={i}>
            <NavLink to={path} end={end && end}>
              {sidebar && icon}
              <span>{sidebar ? name[language] : name['en']}</span>
            </NavLink>

            {/* sidebar counter */}
            {sidebar && links.length -1 === i && isFavorite &&
              <i className={menuState ? style.open : ''}>
                {favoriteCount}
              </i>
            }
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;