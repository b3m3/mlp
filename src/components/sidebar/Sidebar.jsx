import { NavLink } from 'react-router-dom';

import { AiFillHome } from 'react-icons/ai';
import { MdLocalMovies } from 'react-icons/md';
import { RiMovie2Fill } from 'react-icons/ri';
import { MdFavorite } from 'react-icons/md';

import style from './sidebar.module.scss';

const Sidebar = () => {
  return (
    <aside className={style.sidebar}>
      <nav>
        <ul>
          <li className={style.active}>
            <AiFillHome />
            <NavLink to={'/'}>Home</NavLink>
          </li>
          <li>
            <MdLocalMovies />
            <NavLink to={'/Movies'}>Movies</NavLink>
          </li>
          <li>
            <RiMovie2Fill />
            <NavLink to={'/Serials'}>Serials</NavLink>
          </li>
          <li>
            <MdFavorite />
            <NavLink to={'/Favorites'}>Favorites</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;