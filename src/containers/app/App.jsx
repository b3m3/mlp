import { HashRouter, Routes, Route } from 'react-router-dom';

import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Home from '../../containers/home/Home';
import Movies from '../../containers/movies/Movies';
import Serials from '../../containers/serials/Serials';
import Favorites from '../../containers/favorites/Favorites';
import NotFound from '../../containers/notFound/NotFound';

import './app.scss';

const App = () => {
  return (
    <HashRouter>
    <div className="app">
      <Header />
      <div className="container">
        <div className='app-wrapp'>
          <Sidebar />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/movies' element={<Movies />} />
              <Route path='/serials' element={<Serials />} />
              <Route path='/favorites' element={<Favorites />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
    </HashRouter>
  );
}

export default App;