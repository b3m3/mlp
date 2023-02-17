import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu, closeMenu } from '../../../store/slices/menuSlices';

import { Context } from '../../../context/context';

import style from './hamburger.module.scss';

const MenuHamburger = () => {
  const [isActive, setIsActive] = useState(true);

  const menuState = useSelector(state => state.menu.menuState)
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const { refInfoVideo, refInfoActor } = useContext(Context);

  useEffect(() => {
    if (refInfoVideo.current || refInfoActor.current) {
      setIsActive(false);
      dispatch(closeMenu())
    } else {
      setIsActive(true);
    }
  }, [pathname, isActive, dispatch, refInfoVideo, refInfoActor]);

  const className = `${style.hamburger} ${menuState && style.active}`;

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