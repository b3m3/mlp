import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import { AiFillHome } from 'react-icons/ai';
import { MdLocalMovies } from 'react-icons/md';
import { RiMovie2Fill } from 'react-icons/ri';
import { MdFavorite } from 'react-icons/md';

import { Context } from '../../context/context';

import style from './sidebar.module.scss';

const Sidebar = ({menuActive}) => {
  const { currentLang } = useContext(Context);
  const { lang, langCode } = currentLang;

  const links = [
    {EN: 'Home', RU: 'Домашняя', icon: <AiFillHome />, path: '/lang='+langCode},
    {EN: 'Movies', RU: 'Фильмы', icon: <MdLocalMovies />, path: '/movie'+'/lang='+langCode},
    {EN: 'Serials', RU: 'Сериалы', icon: <RiMovie2Fill />, path: '/tv'+'/lang='+langCode},
    {EN: 'Favorites', RU: 'Избранное', icon: <MdFavorite />, path: '/favorites'+'/lang='+langCode},
  ];

  return (
    <aside 
      className={menuActive ? `${style.active} ${style.sidebar}` : style.sidebar}
    >
      <nav>
        <ul>
          {links.map(link => (
            <li key={link.EN}>
              <NavLink to={link.path}>
                {link.icon}
                <span>{link[lang]}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;