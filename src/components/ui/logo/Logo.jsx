import Movie from './Movie.svg';

import style from './logo.module.scss';

const Logo = () => {
  return (
    <h2 className={style.logo}>
      <img src={Movie} alt="Logo" />
      Movies lib
    </h2>
  );
}

export default Logo;