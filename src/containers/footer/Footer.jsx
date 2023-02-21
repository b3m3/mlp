import MenuLinks from '../../components/ordinary/menuLinks/MenuLinks';
import Navbar from '../../components/ordinary/navbar/Navbar';

import LogoTmdb from '../../components/ui/logoTmdb/LogoTmdb';

import style from './footer.module.scss';

const links = [
  {link: 'https://www.themoviedb.org/', name: 'TMDb'},
  {link: 'https://twitter.com/themoviedb', name: 'TMDb Twitter'}
];

const Footer = () => {
  return (
    <footer className={style.wrapp}>
      <div className="container">
        <div className={style.body}>

          <div className={style.col}>
            <h5>Navigation</h5>
            <Navbar />
          </div>

          <div className={style.col}>
            <h5>About</h5>
            <MenuLinks links={links} />
          </div>

          <div className={style.col}>
            <LogoTmdb />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;