import Home from "../containers/home/Home";
import Movies from '../containers/movies/Movies';
import Serials from '../containers/serials/Serials';
import Favorites from '../containers/favorites/Favorites';
import Category from "../containers/category/Category";
import NotFound from '../containers/notFound/NotFound';

const routes = [
  { path: `/movie/:langPath:langCode`, element: <Movies /> },
  { path: `/tv/:langPath:langCode`, element: <Serials /> },
  { path: `/favorites/:langPath:langCode`, element: <Favorites /> },
  { path: `/:video/:langPath:langCode/:category/:page:pageId`, element: <Category /> },
  { path: `*`, element: <NotFound /> },
  { path: `/:langPath:langCode`, element: <Home /> }
];

export default routes;