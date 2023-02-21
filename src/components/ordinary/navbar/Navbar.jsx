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
  const favoriteList = useSelector(state => state.favorite.favoritesList);
  const language = useSelector(state => state.language.language);

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
      <ul>
        {links.map(({name, path, icon, end}, i) => (
          <li key={i}>
            <NavLink to={path} end={end && end}>
              {sidebar && icon}
              <span>{sidebar ? name[language] : name['en']}</span>
            </NavLink>

            {sidebar && links.length -1 === i && favoriteList && favoriteList.length > 0 &&
              <i className={menuState ? style.open : ''}>
                {favoriteList.length}
              </i>
            }
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;