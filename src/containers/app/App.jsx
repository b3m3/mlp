import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useRef } from 'react';

import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Home from '../../containers/home/Home';
import Movies from '../../containers/movies/Movies';
import TvShows from '../tvShows/TvShows';
import Actors from '../actors/Actors';
import Favorites from '../../containers/favorites/Favorites';
import Category from '../../containers/category/Category';
import InfoVideo from '../infoVideo/InfoVideo';
import InfoActor from '../infoActor/InfoActor';
import NotFound from '../../containers/notFound/NotFound';

import { Context } from '../../context/context';
import { FAVORITE_KEY } from '../../constans/localStorage';
import { getFromLocalStorage } from '../../utils/localStorage';

import './app.scss';

const App = () => {
  const favoritesStorage = getFromLocalStorage(FAVORITE_KEY);

  const [menuActive, setMenuActive] = useState(false);
  const [currentLang, setCurrentLang] = useState('');
  const [favorites, setFavorites] = useState(favoritesStorage ? JSON.parse(favoritesStorage) : []);
  
  const refInfoVideo = useRef(null);
  const refInfoActor = useRef(null);

  const provider = {currentLang, menuActive, favorites, setCurrentLang, setMenuActive, setFavorites};

  return (
    <Context.Provider value={provider}>
      <BrowserRouter>
        <div className="app">
          <div className="container">
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
                <Routes>
                  <Route path={'/:lang'} element={<Home/>}/>
                  <Route path={'/:lang/movie'} element={<Movies/>}/>
                  <Route path={'/:lang/tv'} element={<TvShows/>}/>
                  <Route path={'/:lang/person'} element={<Actors/>}/>
                  <Route path={'/:lang/favorites'} element={<Favorites/>}/>
                  <Route path={'/:lang/:type/:category/:page'} element={<Category/>}/>
                  <Route path={'/:lang/:type/:id'} element={<InfoVideo ref={refInfoVideo}/>}/>
                  <Route path={'/:lang/person/:id'} element={<InfoActor ref={refInfoActor}/>}/>
                  <Route path={'/:lang/:type/:category/:id/:page'} element={<Category/>}/>
                  <Route path={'*'} element={<NotFound/>}/>
                  <Route path={'/'} element={<Navigate to={'/'+currentLang} replace/>}/>
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