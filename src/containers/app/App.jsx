import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';

import routes from '../../routes/routes';
import { API_EN, API_RU } from '../../constans/api';
import { Context } from '../../context/context';

import './app.scss';

const App = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [currentLang, setCurrentLang] = useState({lang: 'EN', langCode: API_EN});

  const { langCode } = currentLang;

  const languages = [
    {lang: 'EN', langCode: API_EN}, 
    {lang: 'RU', langCode: API_RU}
  ];

  return (
    <Context.Provider value={{
      currentLang,
      setCurrentLang,
      languages
    }}>
      <BrowserRouter>
        <div className="app">
          <Header 
            onClick={() => setMenuActive(a => !a)}
            menuActive={menuActive}
          />
          <div className="container">
            <div className='app-wrapp'>
              <Sidebar 
                menuActive={menuActive}
              />
              <main>
                <Routes>
                  {routes && routes.map(({ path, element }, i) => (
                    <Route key={i} path={path} element={element} /> ))}
                  
                  <Route path='/' element={<Navigate to={'/lang='+langCode} replace />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;