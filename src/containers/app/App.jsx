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
  const [currentLang, setCurrentLang] = useState({});
  
  const { lang } = currentLang;

  const languages = [
    {lang: 'en', langCode: API_EN},
    {lang: 'ua', langCode: API_UK},
    {lang: 'ru', langCode: API_RU}
  ];
  
  const provider = {languages, currentLang, menuActive, setCurrentLang, setMenuActive };

  useEffect(() => {
    if (localStorage.getItem(LANG_KEY)) {
      setCurrentLang(getFromLocalStorage(LANG_KEY));
    } else {
      setCurrentLang({lang: 'en', langCode: API_EN});
    }
  }, []);

  return (
    <Context.Provider value={provider}>
      <BrowserRouter>
        <div className="app">
          <Header />
          <div className="container">
            <div className='app-wrapp'>
              <Sidebar />
              <main>
                <Routes>
                  {routes && routes.map(({ path, element, exact }, i) => (
                    <Route key={i} path={path} element={element} exact={exact && exact} /> 
                  ))}

                  <Route path='/' element={lang && <Navigate to={LANG+lang} replace />} />
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