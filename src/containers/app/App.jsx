import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import routes from '../../routes/routes';

import { Context } from '../../context/context';

import './app.scss';

const App = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  const languages = ['EN', 'RU'];

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