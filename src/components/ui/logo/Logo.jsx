import { Link } from 'react-router-dom';

import Movie from './Movie.svg';

import style from './logo.module.scss';

const Logo = () => {
  return (
    <Link 
      className={style.wrapp}
      to={'/'}
    >
      <div className={style.logo}>
        <img src={Movie} alt="Logo" />
        <p>
          <span>M</span>
          <span>L</span>
        </p>
      </div>
    </Link>
  );
}

export default Logo;