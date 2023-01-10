import Home from "../containers/home/Home";
import Movies from '../containers/movies/Movies';
import Serials from '../containers/serials/Serials';
import Favorites from '../containers/favorites/Favorites';
import Category from "../containers/category/Category";
import Details from "../containers/details/Details";
import NotFound from '../containers/notFound/NotFound';

import { LANG } from "../constans/api";

const routes = [
  { path: `/movie${LANG}:langCode`, element: <Movies /> },
  { path: `/tv${LANG}:langCode`, element: <Serials /> },
  { path: `/favorites${LANG}:langCode`, element: <Favorites /> },
  { path: `/:video${LANG}:langCode/:category/page=:pageId`, element: <Category /> },
  { path: `/:video${LANG}:langCode/:id`, element: <Details /> },
  { path: `*`, element: <NotFound /> },
  { path: `${LANG}:langCode`, element: <Home /> }
];

export default routes;