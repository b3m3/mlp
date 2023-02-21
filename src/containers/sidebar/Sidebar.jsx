import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { onCloseInfo } from '../../store/slices/infoSlice';

import style from './sidebar.module.scss';
import Navbar from '../../components/ordinary/navbar/Navbar';

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);

  const menuState = useSelector(state => state.menu.menuState);
  const infoState = useSelector(state => state.info.infoState);
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const className = `${style.wrapp} ${menuState && style.active} ${isActive && style.hidden}`;

  useEffect(() => {
    dispatch(onCloseInfo());
    return infoState ? setIsActive(true) : setIsActive(false);
  }, [pathname, infoState, dispatch]);
  
  return (
    <aside className={className}>
      <Navbar sidebar />
    </aside>
  );
}

export default Sidebar;