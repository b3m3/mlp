import style from './hamburger.module.scss';

const MenuHamburger = ({ onClick, menuActive }) => {
  return (
    <button 
      className={menuActive ? `${style.active} ${style.hamburger}` : style.hamburger}
      onClick={onClick}
    >
      <i></i>
      <i></i>
    </button>
  );
}

export default MenuHamburger;