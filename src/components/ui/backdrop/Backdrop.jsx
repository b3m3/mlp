import { API_IMAGE_ORIGINAL } from '../../../constans/api';

import bg from './img/bg.webp';

import style from './backdrop.module.scss';

const Backdrop = ({path}) => {
  return (
    <img 
      className={style.img} 
      src={path ? API_IMAGE_ORIGINAL+path : bg}
      alt={'backdrop'}
    />
  );
}

export default Backdrop;