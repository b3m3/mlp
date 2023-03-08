import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';

import { closeModal } from '../../../store/slices/authModalSlice';

import { TOKEN, VALIDATE, SESSION } from '../../../constants/api';
import { SESSION_ID_KEY } from '../../../constants/localStorage';

import LoadingWave from '../../ui/loadingWave/LoadingWave';

import { IoCloseCircleSharp } from 'react-icons/io5';
import { AiFillCheckCircle } from 'react-icons/ai';

import style from './auth-modal.module.scss';

const AuthModal = () => {
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [errorInputValidate, setErrorInputValidate] = useState(false);
  const [loading, seLoading] = useState(false);
  const [errorApi, setErrorApi] = useState(null);
  const [isOk, setIsOk] = useState(false);

  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    return dispatch(closeModal());
  }, [dispatch]);

  const onInputChange = useCallback((e, setState) => {
    setErrorInputValidate(false);
    setState(e.target.value)
  }, []);

  const inputBackground = errorInputValidate ? {background: 'rgba(237, 45, 45, .4)'} : null;
  const buttonBunStyle = loading ? {pointerEvents: 'all', opacity: '.3'}  : null;

  const authUser = useCallback(() => {
    seLoading(true);

    const token = async () => {
      const result = await axios.get(TOKEN)
        .then(data => {
          if (data && data.data.success) {
            return data.data.request_token;
          }
          return;
        })
        .catch(error => {
          setErrorApi(error.message);
          seLoading(false);
          return;
        });

      return result;
    };

    const validate = async () => {
      const request = await token();

      if (request) {
        const result = await axios
          .post(VALIDATE, {
            "username": userName,
            "password": userPass,
            "request_token": request
          })
          .then(data => {
            if (data && data.data.success) {
              return data.data.request_token;
            }
            return;
          })
          .catch(() => {
            setErrorApi('Wrong username or password');
            seLoading(false);
            return;
          })

        return result;
      }
    };

    const session = async () => {
      const request = await validate();

      if (request) {
        const result = await axios
          .post(SESSION, {
            "request_token": request
          })
          .then(data => {
            setErrorApi(null);
            if (data && data.data.success) {
              return data.data.session_id;
            }
            return;
          })
          .catch(error => {
            setErrorApi(error.message);
            return;
          })
          .finally(() => {
            seLoading(false);
            setIsOk(true);
            setTimeout(handleClose, 2000);
          });
  
        return result;
      }
    };

    const getSession = async () => {
      return await session()
        .then(data => {
          if (data && data !== 'undefined') {
            secureLocalStorage.setItem(SESSION_ID_KEY, data);
            return;
          }
        })
        .catch(error => {
          setErrorApi(error.message);
          return;
        });
    }

    getSession();
  }, [handleClose, userName, userPass]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    if (userName.length && userPass.length >= 4) {
      setErrorInputValidate(false);
      authUser();
    } else {
      setErrorInputValidate(true);
    }
  }, [userName, userPass, authUser]);

  return (
    <div className={style.wrapp}>
      <form>
        <IoCloseCircleSharp 
          className={style.close}
          onClick={handleClose}
        />

        <h2>Log In</h2>

        <input 
          type="text"
          onChange={e => onInputChange(e, setUserName)}
          placeholder={'Username'}
          value={userName}
          style={inputBackground}
        />
        <input 
          type="password" 
          onChange={e => onInputChange(e, setUserPass)}
          placeholder={'Password'}
          value={userPass}
          style={inputBackground}
        />

        {errorApi && <span>{errorApi}</span>}

        <p>
          If you do not have an account,  
          <a 
            href="https://www.themoviedb.org/signup"
            target="_blank" 
            rel="noreferrer"
          >
            click here
          </a>
        </p>

        <button 
          onClick={onSubmit}
          style={buttonBunStyle}
        >
          Login
        </button>

        {loading && <LoadingWave />}
        {isOk && <AiFillCheckCircle className={style.check}/>}
      </form>
    </div>
  );
}

export default AuthModal;