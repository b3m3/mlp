import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { handleAuth } from '../../../store/slices/authSlice';
import { openModal } from '../../../store/slices/authModalSlice';
import { setUserId } from '../../../store/slices/userSlice';

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

  const session_id = localStorage.getItem(SESSION_ID_KEY);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(SESSION_ID_KEY);
    dispatch(handleAuth(false));
  }, [dispatch]);

  const handlOpenModal = useCallback(() => {
    return dispatch(openModal());
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
  }, [])

  useEffect(() => {
    const isSession = session_id && session_id !== null && session_id !== 'undefined';

    if (isSession) {
      axios
        .get(ACCOUNT+session_id)
        .then(data => {
          if (data) {
            dispatch(setUserId(data.data.id));
            setUsername(data.data.username);
            setAvatarPath(data.data.avatar.tmdb.avatar_path);
            dispatch(handleAuth(true));
          }
        })
        .catch(() => dispatch(handleAuth(false)))
        .finally(() => setLoading(false));
    } else {
      dispatch(handleAuth(false));
    }
  }, [dispatch, session_id]);

  return (
    <div className={style.wrapp}>
      {loading
        ? <Spinner />
        : <>
            {auth
              ? <>            
                  <div className={style.poster}>
                    <Poster path={avatarPath} />
                  </div>
                  <LogoutButton handleLogout={handleLogout} username={username} />
                </>
              : <LoginButton handlOpenModal={handlOpenModal} />
            }
          </>
      }

      {modal && <AuthModal />}
    </div>
  );
}

export default Auth;