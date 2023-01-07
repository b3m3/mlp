import { NavLink } from 'react-router-dom';

import { API_LANGUAGE, API_EN, API_RU } from '../../constans/api';

import { AiFillHome } from 'react-icons/ai';
import { MdLocalMovies } from 'react-icons/md';
import { RiMovie2Fill } from 'react-icons/ri';
import { MdFavorite } from 'react-icons/md';

import style from './sidebar.module.scss';

const Sidebar = ({menuActive}) => {
  const links = [
    {name: 'Home', icon: <AiFillHome />, path: '/'},
    {name: 'Movies', icon: <MdLocalMovies />, path: '/movie'},
    {name: 'Serials', icon: <RiMovie2Fill />, path: '/tv'},
    {name: 'Favorites', icon: <MdFavorite />, path: '/favorites'},
  ];

  return (
    <aside 
      className={menuActive ? `${style.active} ${style.sidebar}` : style.sidebar}
    >
      <nav>
        <ul>
          {links.map(({ name, icon, path}) => (
            <li key={name}>
              <NavLink to={path}>
                {icon}
                <span>{name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;