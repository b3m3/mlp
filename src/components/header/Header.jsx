import Search from '../search/search/Search';
import Logo from '../ui/logo/Logo';
import Language from '../ui/language/Language';
import MenuHamburger from '../ui/menuHamburger/MenuHamburger';

import style from './header.module.scss';

const Header = () => {
  return (
    <header className={style.header}>
      <Logo />
      <Search />

      <div className={style.box}>
        <Language />
        <MenuHamburger />
      </div>
    </header>
  );
}

export default Header;