import { Link } from 'react-router-dom';

import Movie from './Movie.svg';

import style from './logo.module.scss';

const Logo = () => {
  return (
    <Link to={'/'}>
      <h2 className={style.logo}>
          <img src={Movie} alt="Logo" />
          Movies lib
      </h2>
    </Link>
  );
}

export default Logo;