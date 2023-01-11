import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import { AiFillHome } from 'react-icons/ai';
import { MdLocalMovies } from 'react-icons/md';
import { RiMovie2Fill } from 'react-icons/ri';
import { MdFavorite } from 'react-icons/md';

import { Context } from '../../context/context';

import style from './sidebar.module.scss';

const Sidebar = () => {
  const { currentLang, menuActive } = useContext(Context);

  const links = [
    {en: 'Home', uk: 'Домашня', ru: 'Домашняя', icon: <AiFillHome />, end: true, path: '/'+currentLang},
    {en: 'Movies', uk: 'Фільми', ru: 'Фильмы', icon: <MdLocalMovies />, path: '/'+currentLang+'/movie'},
    {en: 'Serials', uk: 'Серіали', ru: 'Сериалы', icon: <RiMovie2Fill />, path: '/'+currentLang+'/tv'},
    {en: 'Favorites', uk: 'Вибране', ru: 'Избранное', icon: <MdFavorite />, path: '/'+currentLang+'/favorites'},
  ];

  return (
    <aside 
      className={menuActive ? `${style.active} ${style.sidebar}` : style.sidebar}
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