import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { closeModal } from '../../../store/slices/authModalSlice';

import { TOKEN, VALIDATE, SESSION } from '../../../constants/api';
import { SESSION_ID_KEY } from '../../../constants/localStorage';

import Loading from '../../ui/loading/Loading';

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

  const handleChange = useCallback((e, setState) => {
    setErrorInputValidate(false);
    setState(e.target.value)
  }, []);

  const inputBackground = errorInputValidate ? {background: 'rgba(237, 45, 45, .4)'} : null;
  const buttonBunStyle = loading ? {pointerEvents: 'all', opacity: '.3'}  : null;

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    const getToken = async () => {
      const result = await axios.get(TOKEN)
        .then(data => {
          if (data.data.success) return data.data.request_token;
          return;
        })
        .catch(error => {
          setErrorApi(error.message);
          seLoading(false);
          return;
        });

      return result;
    };

    const postValidate = async () => {
      const request = await getToken();

      if (request) {
        const result = await axios
          .post(VALIDATE, {
            "username": userName,
            "password": userPass,
            "request_token": request
          })
          .then(data => {
            if (data.data.success) return data.data.request_token;
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

    const postSession = async () => {
      const request = await postValidate();

      if (request) {
        const result = await axios
          .post(SESSION, {
            "request_token": request
          })
          .then(data => {
            setErrorApi(null);
            if (data.data.success) return(data.data.session_id);
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

    if (userName.length && userPass.length >= 4) {
      setErrorInputValidate(false);
      seLoading(true);

      postSession()
        .then(data => {
          localStorage.setItem(SESSION_ID_KEY, data);
        })
        .catch(error => console.error(error));
        
    } else {
      setErrorInputValidate(true);
    }
  }, [userName, userPass, handleClose]);

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
          onChange={e => handleChange(e, setUserName)}
          placeholder={'Username'}
          value={userName}
          style={inputBackground}
        />
        <input 
          type="password" 
          onChange={e => handleChange(e, setUserPass)}
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

        {loading && <Loading />}
        {isOk && <AiFillCheckCircle className={style.check}/>}
      </form>
    </div>
  );
}

export default AuthModal;