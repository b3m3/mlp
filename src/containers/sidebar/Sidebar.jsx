import { useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { setFavoriteMovies, setFavoriteTv } from '../../store/slices/favoriteSlice';
import { onCloseInfo } from '../../store/slices/infoSlice';

import Navbar from '../../components/ordinary/navbar/Navbar';
import { API_ACCOUNT, API_FAVORITE, API_KEY, API_MOVIES, API_QUERY_SESSION, API_ROOT, API_TV_SHOWS } from '../../constants/api';
import { SESSION_ID_KEY } from '../../constants/localStorage';

import style from './sidebar.module.scss';

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const [pageMovie, setPageMovie] = useState(1);
  const [pageTv, setPageTv] = useState(1);

  const menuState = useSelector(state => state.menu.menuState);
  const infoState = useSelector(state => state.info.infoState);
  const userId = useSelector(state => state.user.userId);
  const auth = useSelector(state => state.auth.auth);
  const dispatch = useDispatch();
  
  const { pathname } = useLocation();
  const session_id = localStorage.getItem(SESSION_ID_KEY);
  const className = `${style.wrapp} ${menuState && style.active} ${isActive && style.hidden}`;

  const url = useCallback((type) => {
    if (auth) {
      return API_ROOT+API_ACCOUNT+'/'+userId+API_FAVORITE+type+API_KEY+API_QUERY_SESSION+session_id;
    }
  }, [userId, session_id, auth])

  const getData = useCallback(async (url, setState) => {
    return await axios.get(url)
      .then(data => {
        setState(data.data.total_pages)
        return data.data
      })
      .catch(err => {
        console.error(err);
        return;
      })
  }, [])

  const getFavorites = useCallback(async (url, page, setState, slice) => {
    const list = [];

    for (let i = 1; i < page + 2; i++) {
      await getData(`${url}&page=${i}`, setState)
        .then(data => list.push(...data.results))
        .catch(err => {
          console.error(err);
          return;
        })
    }

    return dispatch(slice(list))
  }, [getData, dispatch]);

  useEffect(() => {
    if (auth) {
      getFavorites(url(API_MOVIES), pageMovie, setPageMovie, setFavoriteMovies);
      getFavorites(url(API_TV_SHOWS), pageTv, setPageTv, setFavoriteTv);
  
      const handleClick = (e) => {
        if (e.target.closest('.fav')) {
          getFavorites(url(API_MOVIES), pageMovie, setPageMovie, setFavoriteMovies);
          getFavorites(url(API_TV_SHOWS), pageTv, setPageTv, setFavoriteTv);
        } 
      }
  
      document.addEventListener('click', handleClick);
      setTimeout(() => {
        return() => document.removeEventListener('click', handleClick);
      }, 3000);
    }
  }, [getFavorites, url, pageMovie, pageTv, auth]);

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