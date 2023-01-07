import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import { AiFillHome } from 'react-icons/ai';
import { MdLocalMovies } from 'react-icons/md';
import { RiMovie2Fill } from 'react-icons/ri';
import { MdFavorite } from 'react-icons/md';

import { Context } from '../../context/context';

import { LANG, PAGE } from '../../constans/api';

import style from './sidebar.module.scss';

const Sidebar = ({menuActive}) => {
  const { currentLang } = useContext(Context);
  const { lang } = currentLang;

  const links = [
    {en: 'Home', ru: 'Домашняя', icon: <AiFillHome />, path: LANG+lang},
    {en: 'Movies', ru: 'Фильмы', icon: <MdLocalMovies />, path: '/movie'+LANG+lang},
    {en: 'Serials', ru: 'Сериалы', icon: <RiMovie2Fill />, path: '/tv'+LANG+lang},
    {en: 'Favorites', ru: 'Избранное', icon: <MdFavorite />, path: '/favorites'+LANG+lang},
  ];

  return (
    <aside 
      className={menuActive ? `${style.active} ${style.sidebar}` : style.sidebar}
    >
      <nav>
        <ul>
          {links.map(link => (
            <li key={link.en}>
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