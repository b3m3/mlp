import { useRoutes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '../pages/home/Home';
import Movies from '../pages/movies/Movies';
import TvShows from '../pages/tvShows/TvShows';
import Actors from '../pages/actors/Actors';
import Favorites from '../pages/favorites/Favorites';
import Category from '../containers/category/Category';
import InfoVideo from '../containers/infoVideo/InfoVideo';
import InfoActor from '../containers/infoActor/InfoActor';
import TvSeasons from '../containers/tvSeasons/TvSeasons';
import NotFound from '../pages/notFound/NotFound';

const Router = () => {
  const language = useSelector(state => state.language.language);

  return useRoutes([
    {path: '/:lang', element: <Home/>},
    {path: '/:lang/movie', element: <Movies/>},
    {path: '/:lang/tv', element: <TvShows/>},
    {path: '/:lang/person', element: <Actors/>},
    {path: '/:lang/favorites', element: <Favorites/>},
    {path: '/:lang/:type/:category/:page', element: <Category/>},
    {path: '/:lang/:type/:category/:id/:page', element: <Category/>},
    {path: '/:lang/:type/:id', element: <InfoVideo />},
    {path: '/:lang/person/:id', element: <InfoActor />},
    {path: '/:lang/tv/:id/season', element: <TvSeasons />},
    {path: '*', element: <NotFound/>},
    {path: '/', element: <Navigate to={'/'+language} replace/>}
  ]);
};

export default Router;