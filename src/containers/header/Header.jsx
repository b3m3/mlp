import Search from '../../components/smart/search/search/Search';
import Logo from '../../components/ui/logo/Logo';
import Language from '../../components/smart/language/Language';
import MenuHamburger from '../../components/ui/menuHamburger/MenuHamburger';

import style from './header.module.scss';

const Header = ({ refInfoVideo, refInfoActor }) => {
  return (
    <div className="container">
      <header className={style.header}>
        <Logo />
        <Search />

        <div className={style.box}>
          <Language />
          <MenuHamburger 
            refInfoVideo={refInfoVideo}
            refInfoActor={refInfoActor}
          />
        </div>
      </header>
    </div>
  );
}

export default Header;