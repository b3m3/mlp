import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import secureLocalStorage from "react-secure-storage";
import axios from 'axios';

import { handleAuth } from '../../../store/slices/authSlice';
import { openModal } from '../../../store/slices/authModalSlice';

import AuthModal from '../../ordinary/authModal/AuthModal';
import LogoutButton from '../../ui/logoutButton/LogoutButton';
import LoginButton from '../../ui/loginButton/LoginButton';
import Poster from '../../ui/poster/Poster';
import Spinner from '../../ui/spinner/Spinner';

import { ACCOUNT } from '../../../constants/api';
import { SESSION_ID_KEY } from '../../../constants/localStorage';

import style from './auth.module.scss';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [avatarPath, setAvatarPath] = useState(null);
  const [username, setUsername] = useState(null);

  const modal = useSelector(state => state.modal.modal);
  const auth = useSelector(state => state.auth.auth);
  const dispatch = useDispatch();

  const session_id = secureLocalStorage.getItem(SESSION_ID_KEY);

  const handleLogout = useCallback(() => {
    secureLocalStorage.removeItem(SESSION_ID_KEY);
    dispatch(handleAuth(false));
  }, [dispatch]);

  const handModal = useCallback(() => {
    return dispatch(openModal());
  }, [dispatch]);

  const getAuthState = useCallback(() => {
    if (session_id) return dispatch(handleAuth(true));
    return dispatch(handleAuth(false));
  }, [dispatch, session_id]);

  useEffect(() => {
    getAuthState();
  }, [getAuthState, auth]);

  useEffect(() => {
    if (session_id && session_id !== null) {
      setLoading(true);

      axios.get(ACCOUNT+session_id)
        .then(data => {
          console.log(data.data);
          setUsername(data.data.username);
          setAvatarPath(data.data.avatar.tmdb.avatar_path);
        })
        .finally(() => setLoading(false));
    }
  }, [session_id]);

  return (
    <div className={style.wrapp}>
      {session_id
        ? <>
          {loading
            ? <Spinner/>
            : <>            
                <div className={style.poster}>
                  <Poster path={avatarPath} />
                </div>
                <LogoutButton handleLogout={handleLogout} username={username} />
              </>
          }
          </>
        : <LoginButton handModal={handModal} />}

      {modal && <AuthModal />}
    </div>
  );
}

export default Auth;