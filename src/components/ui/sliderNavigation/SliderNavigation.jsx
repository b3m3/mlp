import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import style from './navigation.module.scss';

const SliderNavigation = ({ prevClass, nextClass, big }) => {
  return (
    <div className={`${style.wrapp} ${big && style.big}`}>
      <button className={prevClass}><IoIosArrowBack/></button>
      <button className={nextClass}><IoIosArrowForward/></button>
    </div>
  );
}

export default SliderNavigation;