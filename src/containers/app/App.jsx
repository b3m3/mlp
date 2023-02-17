import { HashRouter } from 'react-router-dom';
import { useState, useRef } from 'react';

import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Footer from '../../components/footer/Footer';
import Router from '../../routes/Router';

import { Context } from '../../context/context';

import './app.scss';

const App = () => {
  const [currentLang, setCurrentLang] = useState('');
  const provider = { currentLang, setCurrentLang };
  
  const refInfoVideo = useRef(null);
  const refInfoActor = useRef(null);

  return (
    <Context.Provider value={provider}>
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
    </Context.Provider>
  );
}

export default App;