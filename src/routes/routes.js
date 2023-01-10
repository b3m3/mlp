import Home from "../containers/home/Home";
import Movies from '../containers/movies/Movies';
import Serials from '../containers/serials/Serials';
import Favorites from '../containers/favorites/Favorites';
import Category from "../containers/category/Category";
import Details from "../containers/details/Details";
import NotFound from '../containers/notFound/NotFound';

import { LANG } from "../constans/api";

const routes = [
  { path: `/movie${LANG}:langId`, element: <Movies /> },
  { path: `/tv${LANG}:langId`, element: <Serials /> },
  { path: `/favorites${LANG}:langId`, element: <Favorites /> },
  { path: `/:video${LANG}:langId/:category/page=:pageId`, element: <Category /> },
  { path: `/:video${LANG}:langId/:id`, element: <Details /> },
  { path: `*`, element: <NotFound /> },
  { path: `${LANG}:langId`, element: <Home /> }
];

export default routes;