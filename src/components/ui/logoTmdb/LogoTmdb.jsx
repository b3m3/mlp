import tmdb from './img/tmdb.svg';

const LogoTmdb = () => {
  return (
    <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
      <img src={tmdb} alt="TMDb" />
    </a>
  );
}

export default LogoTmdb;