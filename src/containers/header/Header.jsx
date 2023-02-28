import { useSelector } from 'react-redux';

import Search from '../../components/smart/search/search/Search';
import Logo from '../../components/ui/logo/Logo';
import Language from '../../components/smart/language/Language';
import MenuHamburger from '../../components/ordinary/menuHamburger/MenuHamburger';
import AuthButton from '../../components/ui/authButton/AuthButton';
import AuthModal from '../../components/ordinary/authModal/AuthModal';

import style from './header.module.scss';

const Header = () => {
  const authModal = useSelector(s => s.modal.modal);

  return (
    <div className="container">
      <header className={style.header}>
        <Logo />
        <Search />

        <div className={style.box}>
          <AuthButton />
          <Language />
          <MenuHamburger />
        </div>
      </header>

      {authModal && <AuthModal />}
    </div>
  );
}

export default Header;