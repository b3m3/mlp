import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';

import routes from '../../routes/routes';
import { Context } from '../../context/context';
import { LANG, API_EN, API_RU, API_UK } from '../../constans/api';
import { LANG_KEY } from '../../constans/localStorage';
import { getFromLocalStorage } from '../../utils/localStorage';

import './app.scss';

const App = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [currentLang, setCurrentLang] = useState({lang: 'en', langCode: API_EN}); // get from localStorage

  const { lang } = currentLang;

  const languages = [
    {lang: 'en', langCode: API_EN},
    {lang: 'ua', langCode: API_UK},
    {lang: 'ru', langCode: API_RU}
  ];

  useEffect(() => {
    if (localStorage.getItem(LANG_KEY)) {
      setCurrentLang(getFromLocalStorage(LANG_KEY));
    }
  }, []);

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
                  {routes && routes.map(({ path, element, exact }, i) => (
                    <Route key={i} path={path} element={element} exact={exact && exact} /> 
                  ))}
                  <Route path='/' element={<Navigate to={LANG+lang} replace />} />
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