import { NavLink } from 'react-router-dom';

import { AiFillHome } from 'react-icons/ai';
import { MdLocalMovies } from 'react-icons/md';
import { RiMovie2Fill } from 'react-icons/ri';
import { MdFavorite } from 'react-icons/md';

import style from './sidebar.module.scss';

const Sidebar = () => {
  const links = [
    {name: 'Home', icon: <AiFillHome />, path: '/'},
    {name: 'Movies', icon: <MdLocalMovies />, path: '/movies'},
    {name: 'Serials', icon: <RiMovie2Fill />, path: '/serials'},
    {name: 'Favorites', icon: <MdFavorite />, path: '/favorites'},
  ];

  return (
    <aside className={style.sidebar}>
      <nav>
        <ul>
          {links.map(({ name, icon, path}) => (
            <li key={name}>
              <NavLink to={path}>
                {icon}
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;