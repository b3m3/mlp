import Home from "../containers/home/Home";
import Movies from '../containers/movies/Movies';
import Serials from '../containers/serials/Serials';
import Favorites from '../containers/favorites/Favorites';
import NotFound from '../containers/notFound/NotFound';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/movies', element: <Movies /> },
  { path: '/serials', element: <Serials /> },
  { path: '/favorites', element: <Favorites /> },
  { path: '*', element: <NotFound /> }
];

export default routes;