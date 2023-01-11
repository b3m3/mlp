import Home from "../containers/home/Home";
import Movies from '../containers/movies/Movies';
import Serials from '../containers/serials/Serials';
import Favorites from '../containers/favorites/Favorites';
import Category from "../containers/category/Category";
import Details from "../containers/details/Details";
import NotFound from '../containers/notFound/NotFound';

const routes = [
  { path: '/:langId', element: <Home /> },
  { path: '/:langId/movie', element: <Movies /> },
  { path: '/:langId/tv', element: <Serials /> },
  { path: '/:langId/favorites', element: <Favorites /> },
  { path: '/:langId/:video/:category/:pageId', element: <Category /> },
  { path: '/:langId/:video/:videoId', element: <Details /> },
  { path: '*', element: <NotFound /> }
];

export default routes;