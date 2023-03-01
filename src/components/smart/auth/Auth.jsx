import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import secureLocalStorage from "react-secure-storage";

import { handleUser } from '../../../store/slices/userSlice';
import { openModal } from '../../../store/slices/authModalSlice';

import AuthModal from '../../ordinary/authModal/AuthModal';
import LogoutButton from '../../ui/logoutButton/LogoutButton';
import LoginButton from '../../ui/loginButton/LoginButton';
import Poster from '../../ui/poster/Poster';

import { ACCOUNT } from '../../../constants/api';
import { SESSION_ID_KEY } from '../../../constants/localStorage';

import style from './auth.module.scss';
import axios from 'axios';

const Auth = () => {
  const [avatarPath, setAvatarPath] = useState(null);
  const [username, setUsername] = useState(null);

  const modal = useSelector(state => state.modal.modal);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const session_id = secureLocalStorage.getItem(SESSION_ID_KEY);

  const handleLogout = useCallback(() => {
    secureLocalStorage.removeItem(SESSION_ID_KEY);
    dispatch(handleUser(false));
  }, [dispatch]);

  const handModal = useCallback(() => {
    return dispatch(openModal());
  }, [dispatch]);

  const getAuthState = useCallback(() => {
    if (session_id) return dispatch(handleUser(true));
    return dispatch(handleUser(false));
  }, [dispatch, session_id])

  useEffect(() => {
    getAuthState();
  }, [getAuthState, user]);

  useEffect(() => {
    if (session_id && session_id.length > 30) {
      console.log(session_id);
      axios.get(ACCOUNT+session_id)
        .then(data => {
          setUsername(data.data.username);
          setAvatarPath(data.data.avatar.tmdb.avatar_path);
        })
    }
  }, [session_id]);

  return (
    <div className={style.wrapp}>
      {session_id
        ? <>
            {avatarPath &&
              <div className={style.poster}>
                <Poster path={avatarPath} />
              </div>
            }
            <LogoutButton handleLogout={handleLogout} username={username} />
          </>
        : <LoginButton handModal={handModal} />}

      {modal && <AuthModal />}
    </div>
  );
}

export default Auth;