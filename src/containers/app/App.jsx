import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useRef } from 'react';

import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Home from '../../containers/home/Home';
import Movies from '../../containers/movies/Movies';
import TvShows from '../tvShows/TvShows';
import People from '../people/People';
import Favorites from '../../containers/favorites/Favorites';
import Category from '../../containers/category/Category';
import Info from '../info/Info';
import NotFound from '../../containers/notFound/NotFound';

import { Context } from '../../context/context';

import './app.scss';

const App = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [currentLang, setCurrentLang] = useState('');

  const refInfo = useRef(null);

  const provider = {currentLang, menuActive, setCurrentLang, setMenuActive};

  return (
    <Context.Provider value={provider}>
      <BrowserRouter>
        <div className="app">
          <div className="container">
            <Header refInfo={refInfo}/>
            <div className='app-wrapp'>
              <Sidebar refInfo={refInfo}/>
              <main>
                <Routes>
                  <Route path={'/:lang'} element={<Home />} />
                  <Route path={'/:lang/movie'} element={<Movies />} />
                  <Route path={'/:lang/tv'} element={<TvShows />} />
                  <Route path={'/:lang/person'} element={<People />} />
                  <Route path={'/:lang/favorites'} element={<Favorites />} />
                  <Route path={'/:lang/:type/:category/:page'} element={<Category />} />
                  <Route path={'/:lang/:type/:id'} element={<Info ref={refInfo} />} />
                  <Route path={'*'} element={<NotFound />} />
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