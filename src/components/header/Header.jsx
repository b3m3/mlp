import Search from '../ui/search/Search';
import Logo from '../ui/logo/Logo';
import Language from '../ui/language/Language';
import MenuHamburger from '../ui/menuHamburger/MenuHamburger';

import style from './header.module.scss';

const Header = ({onClick, menuActive}) => {
  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.body}>
          <Logo />
          <Search />

          <div className={style.box}>
            <Language />
            <MenuHamburger 
              onClick={onClick}
              menuActive={menuActive}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;