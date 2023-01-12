import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Context } from '../../../context/context';

import style from './hamburger.module.scss';

const MenuHamburger = ({ refDetails }) => {
  const [isActive, setIsActive] = useState(true);

  const { pathname } = useLocation();
  const { menuActive, setMenuActive } = useContext(Context);

  useEffect(() => {
    return refDetails.current ? setIsActive(false) : setIsActive(true);
  }, [pathname]);
  
  console.log(isActive);
  return (
    <>
      {isActive &&      
        <button 
          className={menuActive ? `${style.active} ${style.hamburger}` : style.hamburger}
          onClick={() => setMenuActive(a => !a)}
        >
          <i></i>
          <i></i>
        </button>
      }
    </>
  );
}

export default MenuHamburger;