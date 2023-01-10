import { useContext } from 'react';

import { Context } from '../../../context/context';

import style from './hamburger.module.scss';

const MenuHamburger = () => {
  const { menuActive, setMenuActive } = useContext(Context);

  return (
    <button 
      className={menuActive ? `${style.active} ${style.hamburger}` : style.hamburger}
      onClick={() => setMenuActive(a => !a)}
    >
      <i></i>
      <i></i>
    </button>
  );
}

export default MenuHamburger;