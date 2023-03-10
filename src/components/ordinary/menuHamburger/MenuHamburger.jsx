import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu, closeMenu } from '../../../store/slices/menuSlice';

import style from './hamburger.module.scss';

const MenuHamburger = () => {
  const [isActive, setIsActive] = useState(true);

  const menuState = useSelector(state => state.menu.menuState);
  const infoState = useSelector(state => state.info.infoState);
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const className = `${style.hamburger} ${menuState && style.active}`;

  useEffect(() => {
    if (infoState) {
      setIsActive(false);
      dispatch(closeMenu());
    } else {
      setIsActive(true);
    }
  }, [pathname, isActive, dispatch, infoState]);


  return (
    <>
      {isActive &&
        <button 
          className={className}
          onClick={() => dispatch(toggleMenu())}
        >
          <i></i>
          <i></i>
        </button>
      }
    </>
  );
}

export default MenuHamburger;