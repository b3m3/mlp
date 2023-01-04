import Search from '../ui/search/Search';
import User from '../ui/user/User';
import Logo from '../ui/logo/Logo';

import style from './header.module.scss';

const Header = () => {
  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.body}>
          <Logo />
          <Search />
          <User />
        </div>
      </div>
    </header>
  );
}

export default Header;