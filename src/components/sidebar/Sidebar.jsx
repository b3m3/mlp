import { NavLink, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
// const language = useSelector(state => state.language.language);
import { AiFillHome } from 'react-icons/ai';
import { MdLocalMovies } from 'react-icons/md';
import { RiMovie2Fill } from 'react-icons/ri';
import { MdFavorite } from 'react-icons/md';
import { BsFillPeopleFill } from 'react-icons/bs';

import style from './sidebar.module.scss';

const sidebarTitles = [
  {en: 'Home', uk: 'Домашня', ru: 'Домашняя'},
  {en: 'Movies', uk: 'Фільми', ru: 'Фильмы'},
  {en: 'TV Shows', uk: 'Серіали', ru: 'Сериалы'},
  {en: 'Actors', uk: 'Актори', ru: 'Актеры'},
  {en: 'Favorites', uk: 'Обране', ru: 'Избранное'}
];

const Sidebar = ({ refInfoVideo, refInfoActor }) => {
  const [isActive, setIsActive] = useState(false);

  const menuState = useSelector(state => state.menu.menuState);
  const favoriteList = useSelector(state => state.favorite.favoritesList);
  const language = useSelector(state => state.language.language);

  const { pathname } = useLocation();

  const links = useMemo(() => [
    {icon: <AiFillHome />, path: `/${language}`, end: true},
    {icon: <MdLocalMovies />, path: `/${language}/movie`},
    {icon: <RiMovie2Fill />, path: `/${language}/tv`},
    {icon: <BsFillPeopleFill />, path: `/${language}/person`},
    {icon: <MdFavorite />, path: `/${language}/favorites`}
  ], [language]);

  const classNameNav = `${style.navbar} ${menuState && style.active} ${isActive && style.hidden}`;

  const linkName = useCallback((i) => {
    return sidebarTitles[i][language]
  }, [language])

  useEffect(() => {
    return refInfoVideo.current || refInfoActor.current ? setIsActive(true) : setIsActive(false);
  }, [pathname, refInfoVideo, refInfoActor]);

  return (
    <aside>
      <nav className={classNameNav}>
        <ul>
          {links.map((link, i) => (
            <li key={i}>
              <NavLink 
                to={link.path} 
                end={link.end && link.end} 
                className={({isActive}) => isActive ? style.active : ''}
              >
                {link.icon}
                <span>{linkName(i)}</span>
              </NavLink>

              {links.length -1 === i && favoriteList && favoriteList.length > 0 &&
                <i className={menuState ? style.open : ''}>
                  {favoriteList.length}
                </i>
              }
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;