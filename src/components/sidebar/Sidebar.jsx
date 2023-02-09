import { NavLink, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { AiFillHome } from 'react-icons/ai';
import { MdLocalMovies } from 'react-icons/md';
import { RiMovie2Fill } from 'react-icons/ri';
import { MdFavorite } from 'react-icons/md';
import { BsFillPeopleFill } from 'react-icons/bs';

import { Context } from '../../context/context';

import style from './sidebar.module.scss';

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);

  const { currentLang, menuActive, favorites, refInfoVideo, refInfoActor } = useContext(Context);
  const { pathname } = useLocation();

  const links = [
    {en: 'Home', uk: 'Домашня', ru: 'Домашняя', icon: <AiFillHome />, end: true, path: '/'+currentLang},
    {en: 'Movies', uk: 'Фільми', ru: 'Фильмы', icon: <MdLocalMovies />, path: '/'+currentLang+'/movie'},
    {en: 'TV Shows', uk: 'Серіали', ru: 'Сериалы', icon: <RiMovie2Fill />, path: '/'+currentLang+'/tv'},
    {en: 'Actors', uk: 'Актори', ru: 'Актеры', icon: <BsFillPeopleFill />, path: '/'+currentLang+'/person'},
    {en: 'Favorites', uk: 'Обране', ru: 'Избранное', icon: <MdFavorite />, path: '/'+currentLang+'/favorites'},
  ];

  useEffect(() => {
    return refInfoVideo.current || refInfoActor.current ? setIsActive(true) : setIsActive(false);
  }, [pathname]);

  return (
    <aside>
      <nav className={`${style.navbar} ${menuActive && style.active} ${isActive && style.hidden}`}>
        <ul>
          {links.map((link, i) => (
            <li key={link.en}>
              <NavLink 
                to={link.path} 
                end={link.end && link.end} 
                className={({isActive}) => isActive ? style.active : ''}
              >
                {link.icon}
                <span>{link[currentLang]}</span>
              </NavLink>

              {links.length -1 === i && favorites && favorites.length > 0 &&
                <i className={menuActive ? style.open : ''}>
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