import Search from '../ui/search/Search';
import Logo from '../ui/logo/Logo';
import Language from '../ui/language/Language';
import MenuHamburger from '../ui/menuHamburger/MenuHamburger';

import style from './header.module.scss';

const Header = ({ refVideoInfo }) => {
  return (
    <header className={style.header}>
      <Logo />
      <Search />

      <div className={style.box}>
        <Language />
        <MenuHamburger refVideoInfo={refVideoInfo} />
      </div>
    </header>
  );
}

export default Header;