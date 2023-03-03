import { useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { onCloseInfo } from '../../store/slices/infoSlice';
import { setFavoriteMovies, setFavoriteTv } from '../../store/slices/favoriteSlice';

import style from './sidebar.module.scss';
import Navbar from '../../components/ordinary/navbar/Navbar';
import { API_ACCOUNT, API_FAVORITE, API_KEY, API_MOVIES, API_QUERY_SESSION, API_ROOT, API_TV_SHOWS } from '../../constants/api';
import { SESSION_ID_KEY } from '../../constants/localStorage';
import axios from 'axios';

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();
  const menuState = useSelector(state => state.menu.menuState);
  const infoState = useSelector(state => state.info.infoState);
  const userId = useSelector(state => state.user.userId);
  const favoriteMovies = useSelector(state => state.favorite.favoriteMovies);
  const favoriteTv = useSelector(state => state.favorite.favoriteTv);
  const session_id = localStorage.getItem(SESSION_ID_KEY);

  // console.log('favoriteMovies', favoriteMovies);
  // console.log('favoriteTv', favoriteTv);

  const { pathname } = useLocation();
  const className = `${style.wrapp} ${menuState && style.active} ${isActive && style.hidden}`;

  const url = useCallback((type) => {
    return API_ROOT+API_ACCOUNT+'/'+userId+API_FAVORITE+type+API_KEY+API_QUERY_SESSION+session_id;
  }, [userId, session_id])

  const getFavorites = useCallback(async (url, slice) => {
    await axios
      .get(url)
      .then(data => {
        dispatch(slice(data.data.results))
        return;
      })
      .catch(err => console.log(err))
  }, [dispatch]);


  useEffect(() => {
    getFavorites(url(API_MOVIES), setFavoriteMovies);
    getFavorites(url(API_TV_SHOWS), setFavoriteTv);
    
    document.addEventListener('click', e => {
      if (e.target.closest('.fav')) {
        getFavorites(url(API_MOVIES), setFavoriteMovies);
        getFavorites(url(API_TV_SHOWS), setFavoriteTv);
        return;
      } 
    }) 
  }, [getFavorites, url]);

  useEffect(() => {
    dispatch(onCloseInfo());
    return infoState ? setIsActive(true) : setIsActive(false);
  }, [pathname, infoState, dispatch]);

  return (
    <aside className={className}>
      <Navbar sidebar />
    </aside>
  );
}

export default Sidebar;