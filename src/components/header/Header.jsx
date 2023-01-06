import Search from '../ui/search/Search';
// import User from '../ui/user/User';
import Logo from '../ui/logo/Logo';
import MenuHamburger from '../ui/menuHamburger/MenuHamburger';

import style from './header.module.scss';

const Header = ({onClick, menuActive}) => {
  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.body}>
          <Logo />
          <Search />
          {/* <User /> */}
          <MenuHamburger 
            onClick={onClick}
            menuActive={menuActive}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;