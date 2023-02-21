import { HashRouter } from 'react-router-dom';
import { useRef } from 'react';

import Header from '../../containers/header/Header';
import Sidebar from '../../containers/sidebar/Sidebar';
import Footer from '../../containers/footer/Footer';
import Router from '../../routes/Router';

import style from './app.module.scss';
import '../../styles/index.css';

const App = () => {
  const refInfo = useRef(null);

  return (
    <HashRouter>
      <div className={style.app}>
        <Header refInfo={refInfo}/>
          <div className={style.wrapp}>
            <Sidebar refInfo={refInfo}/>
            <main className={style.main}>
              <Router refInfo={refInfo}/>
            </main>
          </div>
        <Footer/>
      </div>
    </HashRouter>
  );
}

export default App;