import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useRef } from 'react';

import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Home from '../../containers/home/Home';
import Movies from '../../containers/movies/Movies';
import TV_SHOWS from '../tvShows/TvShows';
import Favorites from '../../containers/favorites/Favorites';
import Category from '../../containers/category/Category';
import Details from '../../containers/details/Details';
import NotFound from '../../containers/notFound/NotFound';

import { Context } from '../../context/context';

import './app.scss';

const App = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [currentLang, setCurrentLang] = useState('');

  const refDetails = useRef(null);

  const provider = {currentLang, menuActive, setCurrentLang, setMenuActive};

  return (
    <Context.Provider value={provider}>
      <BrowserRouter>
        <div className="app">
          <Header refDetails={refDetails} />
            <div className='app-wrapp'>
              <Sidebar refDetails={refDetails} />
              <main>
                <Routes>
                  <Route path={'/:langId'} element={<Home />} />
                  <Route path={'/:langId/movie'} element={<Movies />} />
                  <Route path={'/:langId/tv'} element={<TV_SHOWS />} />
                  <Route path={'/:langId/favorites'} element={<Favorites />} />
                  <Route path={'/:langId/:video/:category/:pageId'} element={<Category />} />
                  <Route path={'/:langId/:video/:videoId'} element={<Details ref={refDetails} />} />
                  <Route path={'*'} element={<NotFound />} />

                  <Route path={'/'} element={<Navigate to={'/'+currentLang} replace />} />
                </Routes>
              </main>
            </div>
        </div>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;