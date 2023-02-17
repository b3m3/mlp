import { HashRouter } from 'react-router-dom';
import { useRef } from 'react';

import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Footer from '../../components/footer/Footer';
import Router from '../../routes/Router';

import './app.scss';

const App = () => {
  const refInfoVideo = useRef(null);
  const refInfoActor = useRef(null);

  return (
    <HashRouter>
      <div className="app">
        <Header 
          refInfoVideo={refInfoVideo}
          refInfoActor={refInfoActor}
        />
          <div className='app-wrapp'>
            <Sidebar 
              refInfoVideo={refInfoVideo}
              refInfoActor={refInfoActor}
            />
            <main>
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