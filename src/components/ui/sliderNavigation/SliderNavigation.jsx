import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import style from './navigation.module.scss';

const SliderNavigation = ({ prevClass, nextClass }) => {
  return (
    <div className={style.wrapp}>
      <span className={prevClass}><IoIosArrowBack/></span>
      <span className={nextClass}><IoIosArrowForward/></span>
    </div>
  );
}

export default SliderNavigation;