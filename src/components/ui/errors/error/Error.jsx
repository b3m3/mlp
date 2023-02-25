import error from './img/error.webp';

import style from './error.module.scss';

const Error = () => {
  return (
    <div className={style.wrapp}>
      <img src={error} alt="Erorr" className={style.img} />
    </div>
  );
}

export default Error;