import { API_BACKGROUND } from '../../../constans/api';

import BackdropImg from './img/backdrop.webp';

import style from './backdrop.module.scss';

const Backdrop = ({ backdrop }) => {
  return (
    <div className={style.wrapp}>
      <img 
        src={backdrop ? API_BACKGROUND+backdrop : BackdropImg} 
        alt={'backdrop'} 
      />
      <span />
    </div>
  );
}

export default Backdrop;