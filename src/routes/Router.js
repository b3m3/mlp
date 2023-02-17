import { useRoutes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '../containers/home/Home';
import Movies from '../containers/movies/Movies';
import TvShows from '../containers/tvShows/TvShows';
import Actors from '../containers/actors/Actors';
import Favorites from '../containers/favorites/Favorites';
import Category from '../containers/category/Category';
import InfoVideo from '../containers/infoVideo/InfoVideo';
import InfoActor from '../containers/infoActor/InfoActor';
import NotFound from '../containers/notFound/NotFound';

const Router = ({ refInfoVideo, refInfoActor }) => {
  const language = useSelector(state => state.language.language);

  return useRoutes([
    {path: '/:lang', element: <Home/>},
    {path: '/:lang/movie', element: <Movies/>},
    {path: '/:lang/tv', element: <TvShows/>},
    {path: '/:lang/person', element: <Actors/>},
    {path: '/:lang/favorites', element: <Favorites/>},
    {path: '/:lang/:type/:category/:page', element: <Category/>},
    {path: '/:lang/:type/:id', element: <InfoVideo ref={refInfoVideo}/>},
    {path: '/:lang/person/:id', element: <InfoActor ref={refInfoActor}/>},
    {path: '/:lang/:type/:category/:id/:page', element: <Category/>},
    {path: '*', element: <NotFound/>},
    {path: '/', element: <Navigate to={'/'+language} replace/>}
  ]);
};

export default Router;