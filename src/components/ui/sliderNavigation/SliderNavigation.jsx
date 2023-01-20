import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import style from './navigation.module.scss';

const SliderNavigation = ({ prevClass, nextClass }) => {
  return (
    <div className={style.wrapp}>
      <button className={prevClass}><IoIosArrowBack/></button>
      <button className={nextClass}><IoIosArrowForward/></button>
    </div>
  );
}

export default SliderNavigation;