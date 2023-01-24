import { useLocation } from 'react-router-dom';

import { API_IMAGE_ORIGINAL } from '../../../constans/api';
import { getTypeFromLocation } from '../../../utils/functions';

import BackdropImg from './img/backdrop.webp';

import style from './backdrop.module.scss';

const Backdrop = ({ backdrop }) => {
  const { pathname } = useLocation();

  const isPerson = getTypeFromLocation(pathname) === '/person';

  return (
    <div className={style.wrapp}>
      <img 
        src={backdrop ? API_IMAGE_ORIGINAL+backdrop : BackdropImg}
        alt={'backdrop'} 
      />
      <span className={isPerson ? style.blur : style.gradient} />
    </div>
  );
}

export default Backdrop;