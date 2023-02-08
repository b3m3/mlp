import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Context } from '../../context/context';

import Logo from '../ui/logo/Logo';
import tmdb from './img/tmdb.svg';

import style from './footer.module.scss';

const Footer = () => {
  const { currentLang } = useContext(Context);

  const tmdbLinks = [
    {link: 'https://www.themoviedb.org/', name: 'The Movie Database'},
    {link: 'https://twitter.com/themoviedb',name: 'TMDB Twitter'}
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
            <h5>TMDb</h5>
            <ul>
              {tmdbLinks.map(({link, name}, i) => (
                <li key={i}>
                  <a href={link} target="_blank" rel="noreferrer">{name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={style.col}>
            <h5>About</h5>
            
            <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
              <img src={tmdb} alt="TMDb" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;