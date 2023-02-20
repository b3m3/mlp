import { useLocation } from 'react-router-dom';

import { API_IMAGE_ORIGINAL } from '../../../constants/api';
import { getTypeFromLocation } from '../../../utils/functions';

import bgMask from './img/bg-mask.webp';

import style from './background.module.scss';

const Background = ({ path }) => {
  const { pathname } = useLocation();

  const isPerson = getTypeFromLocation(pathname) === '/person';

  return (
    <div className={style.wrapp}>
      <img 
        src={path ? API_IMAGE_ORIGINAL+path : bgMask}
        alt={'background'}
      />
      <span className={isPerson ? style.blur : style.gradient} />
    </div>
  );
}

export default Background;