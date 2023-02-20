import { HashRouter } from 'react-router-dom';
import { useRef } from 'react';

import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Footer from '../../components/footer/Footer';
import Router from '../../routes/Router';

import style from './app.module.scss';
import '../../styles/index.css';

const App = () => {
  const refInfoVideo = useRef(null);
  const refInfoActor = useRef(null);

  return (
    <HashRouter>
      <div className={style.app}>
        <Header 
          refInfoVideo={refInfoVideo}
          refInfoActor={refInfoActor}
        />
          <div className={style.wrapp}>
            <Sidebar 
              refInfoVideo={refInfoVideo}
              refInfoActor={refInfoActor}
            />
            <main className={style.main}>
              <Router 
                refInfoVideo={refInfoVideo}
                refInfoActor={refInfoActor}
              />
            </main>
          </div>
        <Footer/>
      </div>
    </HashRouter>
  );
}

export default App;