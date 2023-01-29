import { useEffect, useState } from 'react';

import { API_IMAGE_ORIGINAL } from '../../../constans/api';

import bg from './img/bg.webp';

import style from './backdrop.module.scss';

const Backdrop = ({ path }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, []);

  return (
    <div>
      {!loaded && 
        <img 
          className={style.img} 
          src={bg} 
          alt={'backdrop'}
        />
      }

      <img
        onLoad={() => setLoaded(true)}
        className={style.img}
        src={path ? API_IMAGE_ORIGINAL+path : bg}
        alt={'backdrop'}
      />
    </div>
  );
}

export default Backdrop;