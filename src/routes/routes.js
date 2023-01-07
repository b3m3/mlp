import Home from "../containers/home/Home";
import Movies from '../containers/movies/Movies';
import Serials from '../containers/serials/Serials';
import Favorites from '../containers/favorites/Favorites';
import Category from "../containers/category/Category";
import NotFound from '../containers/notFound/NotFound';

import { API_LANGUAGE, API_PAGE } from "../constans/api";

const routes = [
  { path: '/', element: <Home /> },
  { path: '/movie', element: <Movies /> },
  { path: '/tv', element: <Serials /> },
  { path: '/favorites', element: <Favorites /> },
  { path: '/:video'+'/:category'+API_LANGUAGE+':lang'+API_PAGE+':pageid', element: <Category /> },
  { path: '*', element: <NotFound /> }
];

export default routes;