import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useRef } from 'react';

import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Home from '../../containers/home/Home';
import Movies from '../../containers/movies/Movies';
import TvShows from '../tvShows/TvShows';
import People from '../people/People';
import PeopleInfo from '../peopleInfo/PeopleInfo';
import Favorites from '../../containers/favorites/Favorites';
import Category from '../../containers/category/Category';
import VideoInfo from '../videoInfo/VideoInfo';
import NotFound from '../../containers/notFound/NotFound';

import { Context } from '../../context/context';

import './app.scss';

const App = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [currentLang, setCurrentLang] = useState('');

  const refVideoInfo = useRef(null);
  const refPeopleInfo = useRef(null);

  const provider = {currentLang, menuActive, setCurrentLang, setMenuActive};

  return (
    <Context.Provider value={provider}>
      <BrowserRouter>
        <div className="app">
          <div className="container">
            <Header 
              refVideoInfo={refVideoInfo}
              refPeopleInfo={refPeopleInfo}
            />
            <div className='app-wrapp'>
              <Sidebar 
                refVideoInfo={refVideoInfo}
                refPeopleInfo={refPeopleInfo}
              />
              <main>
                <Routes>
                  <Route path={'/:langId'} element={<Home />} />
                  <Route path={'/:langId/movie'} element={<Movies />} />
                  <Route path={'/:langId/tv'} element={<TvShows />} />
                  <Route path={'/:langId/people'} element={<People />} />
                  <Route path={'/:langId/favorites'} element={<Favorites />} />
                  <Route path={'/:langId/:type/:category/:pageId'} element={<Category />} />
                  <Route path={'/:langId/:type/:videoId'} element={<VideoInfo ref={refVideoInfo} />} />
                  <Route path={'/:langId/people/:peopleId'} element={<PeopleInfo ref={refPeopleInfo} />} />
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