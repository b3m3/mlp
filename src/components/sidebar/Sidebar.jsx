import { NavLink, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { Context } from '../../context/context';
import { sidebarTitles } from '../../constans/titles';

import { AiFillHome } from 'react-icons/ai';
import { MdLocalMovies } from 'react-icons/md';
import { RiMovie2Fill } from 'react-icons/ri';
import { MdFavorite } from 'react-icons/md';
import { BsFillPeopleFill } from 'react-icons/bs';

import style from './sidebar.module.scss';

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);

  const { currentLang, menuActive, favorites, refInfoVideo, refInfoActor } = useContext(Context);
  const { pathname } = useLocation();

  const links = [
    {icon: <AiFillHome />, path: `/${currentLang}`, end: true},
    {icon: <MdLocalMovies />, path: `/${currentLang}/movie`},
    {icon: <RiMovie2Fill />, path: `/${currentLang}/tv`},
    {icon: <BsFillPeopleFill />, path: `/${currentLang}/person`},
    {icon: <MdFavorite />, path: `/${currentLang}/favorites`}
  ];

  useEffect(() => {
    return refInfoVideo.current || refInfoActor.current ? setIsActive(true) : setIsActive(false);
  }, [pathname, refInfoVideo, refInfoActor]);

  return (
    <aside>
      <nav className={`${style.navbar} ${menuActive && style.active} ${isActive && style.hidden}`}>
        <ul>
          {links.map((link, i) => (
            <li key={i}>
              <NavLink 
                to={link.path} 
                end={link.end && link.end} 
                className={({isActive}) => isActive ? style.active : ''}
              >
                {link.icon}
                <span>{sidebarTitles[i][currentLang]}</span>
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