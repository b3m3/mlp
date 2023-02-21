import { BrowserRouter } from 'react-router-dom';

import Header from '../../containers/header/Header';
import Sidebar from '../../containers/sidebar/Sidebar';
import Footer from '../../containers/footer/Footer';
import Router from '../../routes/Router';

import style from './app.module.scss';
import '../../styles/index.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className={style.app}>
        <Header/>
          <div className={style.wrapp}>
            <Sidebar/>
            <main className={style.main}>
              <Router/>
            </main>
          </div>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;