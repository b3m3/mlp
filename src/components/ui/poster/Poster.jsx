import { API_POSTER } from '../../../constants/api';
import { useLoadingImage } from '../../../hooks/useLoadingImage';

import NoPoster from './img/not-image.webp';

import style from './poster.module.scss';

const Poster = ({ path }) => {
  const src = path ? path.indexOf('http') === 1 ? path.slice(1) : API_POSTER+path : NoPoster;

  const { Mask, setLoaded } = useLoadingImage();

  return (
    <>
      <Mask />

      <img
        onLoad={() => setLoaded(true)}
        src={src}
        alt="poster"
        className={style.img}
      />
    </>
  );
}

export default Poster;