import { useLoadingImage } from '../../../hooks/useLoadingImage';

import { API_IMAGE_ORIGINAL, API_IMAGE_1280 } from '../../../constants/api';

import bgMask from './img/bg-mask.webp';

import style from './backdrop.module.scss';

const Backdrop = ({ path, light }) => {
  const src = path ? light ? API_IMAGE_1280+path : API_IMAGE_ORIGINAL+path : bgMask;
  
  const { Mask, setLoaded } = useLoadingImage();
  
  return (
    <div>
      <Mask />

      <img
        onLoad={() => setLoaded(true)}
        className={style.img}
        src={src}
        alt={'backdrop'}
      />
    </div>
  );
}

export default Backdrop;