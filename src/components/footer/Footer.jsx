import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Context } from '../../context/context';

import Logo from '../ui/logo/Logo';

import style from './footer.module.scss';

const Footer = () => {
  const { currentLang } = useContext(Context);

  const tmdbLinks = [
    {link: 'https://www.themoviedb.org/', name: 'The movie DB'},
    {link: 'https://www.themoviedb.org/about',name: 'The movie about'},
    {link: 'https://twitter.com/themoviedb',name: 'The movie twitter'}
  ];

  const navigationLinks = [
    {path: `/${currentLang}`, name: 'Home'},
    {path: `/${currentLang}/movie`, name: 'Movies'},
    {path: `/${currentLang}/tv`, name: 'TV Shows'},
    {path: `/${currentLang}/person`, name: 'Actors'},
    {path: `/${currentLang}/favorites`, name: 'Favorites'},
  ];

  return (
    <footer className={style.wrapp}>
      <div className="container">
        <div className={style.body}>
          <div className={style.col}>
            <Logo />
          </div>

          <div className={style.col}>
            <h5>Navigation</h5>

            <ul>
              {navigationLinks.map(({path, name}, i) => (
                <li key={i}>
                  <Link to={path}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={style.col}>
            <h5>TMDB</h5>
            <ul>
              {tmdbLinks.map(({link, name}, i) => (
                <li key={i}>
                  <a href={link} target="_blank" rel="noreferrer">{name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;