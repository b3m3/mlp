import { NavLink, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { AiFillHome } from 'react-icons/ai';
import { MdLocalMovies } from 'react-icons/md';
import { RiMovie2Fill } from 'react-icons/ri';
import { MdFavorite } from 'react-icons/md';

import { Context } from '../../context/context';

import style from './sidebar.module.scss';

const Sidebar = ({refDetails}) => {
  const [isActive, setIsActive] = useState(false);

  const { currentLang, menuActive } = useContext(Context);
  const { pathname } = useLocation();

  const links = [
    {en: 'Home', uk: 'Домашня', ru: 'Домашняя', icon: <AiFillHome />, end: true, path: '/'+currentLang},
    {en: 'Movies', uk: 'Фільми', ru: 'Фильмы', icon: <MdLocalMovies />, path: '/'+currentLang+'/movie'},
    {en: 'Serials', uk: 'Серіали', ru: 'Сериалы', icon: <RiMovie2Fill />, path: '/'+currentLang+'/tv'},
    {en: 'Favorites', uk: 'Вибране', ru: 'Избранное', icon: <MdFavorite />, path: '/'+currentLang+'/favorites'},
  ];

  useEffect(() => {
    return refDetails.current ? setIsActive(true) : setIsActive(false);
  }, [pathname]);

  return (
    <aside 
      className={`${style.sidebar} ${menuActive && style.active} ${isActive && style.hidden}`}
    >
      <nav>
        <ul>
          {links.map(link => (
            <li key={link.en}>
              <NavLink to={link.path} end={link.end && link.end}>
                {link.icon}
                <span>{link[currentLang]}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;