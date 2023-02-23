import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";

import Backdrop from '../../ui/backdrop/Backdrop';
import Button from '../../ui/button/Button';

import { IoCloseCircleSharp } from 'react-icons/io5';

import style from './photo-gallery.module.scss';
import 'swiper/css';
import "swiper/css/navigation";

const PhotoGallery = ({ results, initial, setShowGallery }) => {
  return (
    <div className={style.wrapp}>
      <Swiper
        className={style.swiper}
        slidesPerView={1}
        initialSlide={initial && initial}
        navigation={{
          prevEl: '.ph-gal-prev',
          nextEl: '.ph-gal-next'
        }}
        loop={true}
        modules={[Navigation]}
      >
        {results && results.profiles.map(({ file_path }, i) => (
          <SwiperSlide key={i}>
            <Backdrop path={file_path} ligth />
          </SwiperSlide>
        ))}

      </Swiper>

      <div className={style.navigate}>
        <span className='ph-gal-prev'>
          <Button left />
        </span>
        <span className='ph-gal-next'>
          <Button />
        </span>
      </div>

      <span
        className={style.close}
        onClick={() => setShowGallery(false)}
      >
        <IoCloseCircleSharp />
      </span>
    </div>
  );
}

export default PhotoGallery;