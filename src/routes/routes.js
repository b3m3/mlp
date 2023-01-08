import Home from "../containers/home/Home";
import Movies from '../containers/movies/Movies';
import Serials from '../containers/serials/Serials';
import Favorites from '../containers/favorites/Favorites';
import Category from "../containers/category/Category";
import NotFound from '../containers/notFound/NotFound';

const routes = [
  { path: `/movie/lang=:langCode`, element: <Movies /> },
  { path: `/tv/lang=:langCode`, element: <Serials /> },
  { path: `/favorites/lang=:langCode`, element: <Favorites /> },
  { path: `/:video/lang=:langCode/:category/page=:pageId`, element: <Category /> },
  { path: `*`, element: <NotFound /> },
  { path: `/lang=:langCode`, element: <Home /> }
];

export default routes;