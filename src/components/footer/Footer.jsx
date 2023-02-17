import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import tmdb from './img/tmdb.svg';

import style from './footer.module.scss';
import { useMemo } from 'react';

const Footer = () => {
  const language = useSelector(state => state.language.language);

  const tmdbLinks = useMemo(() => [
    {link: 'https://www.themoviedb.org/', name: 'TMDb'},
    {link: 'https://twitter.com/themoviedb',name: 'TMDb Twitter'}
  ], []);

  const navigationLinks = useMemo(() => [
    {path: `/${language}`, name: 'Home'},
    {path: `/${language}/movie`, name: 'Movies'},
    {path: `/${language}/tv`, name: 'TV Shows'},
    {path: `/${language}/person`, name: 'Actors'},
    {path: `/${language}/favorites`, name: 'Favorites'},
  ], [language]);

  return (
    <footer className={style.wrapp}>
      <div className="container">
        <div className={style.body}>
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
            <h5>About</h5>
            <ul>
              {tmdbLinks.map(({link, name}, i) => (
                <li key={i}>
                  <a href={link} target="_blank" rel="noreferrer">{name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={style.col}>
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