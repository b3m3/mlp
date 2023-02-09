import { useEffect, useState } from 'react';

import { API_IMAGE_ORIGINAL, API_IMAGE_1280 } from '../../../constans/api';

import bgMask from './img/bg-mask.webp';
import whiteMask  from './img/white-mask.svg';

import style from './backdrop.module.scss';

const Backdrop = ({ path, actor, light }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, []);

  return (
    <div>
      {!loaded && 
        <img 
          className={style.img} 
          src={actor ? whiteMask : bgMask}
          alt={'backdrop'}
        />
      }

      <img
        onLoad={() => setLoaded(true)}
        className={style.img}
        src={path ? light ? API_IMAGE_1280+path : API_IMAGE_ORIGINAL+path : bgMask}
        alt={'backdrop'}
      />
    </div>
  );
}

export default Backdrop;