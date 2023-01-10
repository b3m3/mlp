import style from './button.module.scss';

import {IoIosArrowDropleftCircle} from 'react-icons/io';
import {IoIosArrowDroprightCircle} from 'react-icons/io';

const Button = ({ left }) => {
  return (
    <button 
      className={style.button}
    >
      {left ? <IoIosArrowDropleftCircle /> : <IoIosArrowDroprightCircle />}
    </button>
  );
}

export default Button;