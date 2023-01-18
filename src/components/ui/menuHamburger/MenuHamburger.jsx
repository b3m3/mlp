import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Context } from '../../../context/context';

import style from './hamburger.module.scss';

const MenuHamburger = ({ refDetails }) => {
  const [isActive, setIsActive] = useState(true);

  const { pathname } = useLocation();
  const { menuActive, setMenuActive } = useContext(Context);

  useEffect(() => {
    if (refDetails.current) {
      setIsActive(false);
      setMenuActive(false);
    } else {
      setIsActive(true)
    }
  }, [pathname]);

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