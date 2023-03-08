import { useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';

import { setFavoriteMovies, setFavoriteTv } from '../../store/slices/favoriteSlice';
import { onCloseInfo } from '../../store/slices/infoSlice';

import Navbar from '../../components/ordinary/navbar/Navbar';
import { API_ACCOUNT, API_FAVORITE, API_KEY, API_MOVIES, API_QUERY_SESSION, API_ROOT, API_TV_SHOWS, API_LANGUAGE } from '../../constants/api';
import { SESSION_ID_KEY } from '../../constants/localStorage';

import style from './sidebar.module.scss';

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const [pageMovie, setPageMovie] = useState(1);
  const [pageTv, setPageTv] = useState(1);

  const language = useSelector(state => state.language.language);
  const menuState = useSelector(state => state.menu.menuState);
  const infoState = useSelector(state => state.info.infoState);
  const userId = useSelector(state => state.user.userId);
  const auth = useSelector(state => state.auth.auth);
  const dispatch = useDispatch();
  
  const { pathname } = useLocation();
  const session_id = secureLocalStorage.getItem(SESSION_ID_KEY);

  const className = `${style.wrapp} ${menuState && style.active} ${isActive && style.hidden}`;

  const url = useCallback((type) => {
    const isSession = session_id && session_id !== null && session_id !== 'undefined';

    if (auth && isSession) {
      return API_ROOT+API_ACCOUNT+'/'+userId+API_FAVORITE+type+API_KEY+API_QUERY_SESSION+session_id+API_LANGUAGE+language;
    }
  }, [userId, session_id, auth, language])

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