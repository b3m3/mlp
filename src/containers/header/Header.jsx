import { useSelector } from 'react-redux';

import Search from '../../components/smart/search/Search';
import Logo from '../../components/ui/logo/Logo';
import Language from '../../components/smart/language/Language';
import MenuHamburger from '../../components/ordinary/menuHamburger/MenuHamburger';
import Auth from '../../components/smart/auth/Auth';
import AuthModal from '../../components/ordinary/authModal/AuthModal';

import style from './header.module.scss';

const Header = () => {
  const modal = useSelector(state => state.modal.modal);

  return (
    <div className="container">
      <header className={style.header}>
        <Logo />
        <Search />

        <div className={style.box}>
          <Auth />
          <Language />
          <MenuHamburger />
        </div>

        {modal && <AuthModal />}
      </header>
    </div>
  );
}

export default Header;