import { NavLink, useLocation } from 'react-router-dom';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { Context } from '../../context/context';

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

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);

  const menuState = useSelector(state => state.menu.menuState);

  const { currentLang, favorites, refInfoVideo, refInfoActor } = useContext(Context);
  const { pathname } = useLocation();

  const links = useMemo(() => [
    {icon: <AiFillHome />, path: `/${currentLang}`, end: true},
    {icon: <MdLocalMovies />, path: `/${currentLang}/movie`},
    {icon: <RiMovie2Fill />, path: `/${currentLang}/tv`},
    {icon: <BsFillPeopleFill />, path: `/${currentLang}/person`},
    {icon: <MdFavorite />, path: `/${currentLang}/favorites`}
  ], [currentLang]);

  const classNameNav = `${style.navbar} ${menuState && style.active} ${isActive && style.hidden}`;

  const linkName = useCallback((i) => {
    return sidebarTitles[i][currentLang]
  }, [currentLang])

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

              {links.length -1 === i && favorites && favorites.length > 0 &&
                <i className={menuState && style.open}>
                  {favorites.length}
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