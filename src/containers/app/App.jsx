import { BrowserRouter } from 'react-router-dom';
import { useState, useRef } from 'react';

import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';

import { Context } from '../../context/context';
import { FAVORITE_KEY } from '../../constans/localStorage';
import { getFromLocalStorage } from '../../utils/localStorage';

import RoutesElements from '../../routes/RoutesElements';

import './app.scss';

const App = () => {
  const favoritesStorage = getFromLocalStorage(FAVORITE_KEY);

  const [menuActive, setMenuActive] = useState(false);
  const [currentLang, setCurrentLang] = useState('');
  const [favorites, setFavorites] = useState(favoritesStorage ? JSON.parse(favoritesStorage) : []);
  
  const refInfoVideo = useRef(null);
  const refInfoActor = useRef(null);

  const provider = {
    currentLang, menuActive, favorites, 
    setCurrentLang, setMenuActive, setFavorites,
    refInfoVideo, refInfoActor
  };

  return (
    <Context.Provider value={provider}>
      <BrowserRouter>
        <div className="app">
          <div className="container">
            <Header />
            <div className='app-wrapp'>
              <Sidebar />
              <main>
                <RoutesElements />
              </main>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;