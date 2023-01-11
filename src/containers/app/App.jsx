import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';

import routes from '../../routes/routes';
import { Context } from '../../context/context';

import './app.scss';

const App = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [currentLang, setCurrentLang] = useState('');

  const provider = {currentLang, menuActive, setCurrentLang, setMenuActive };

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

                  <Route path={'/'} element={<Navigate to={'/'+currentLang} replace />} />
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