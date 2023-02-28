import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../store/slices/authModalSlice';

import { AiOutlineLogin } from 'react-icons/ai';

import style from './auth-button.module.scss';

const AuthButton = () => {
  const dispatch = useDispatch();

  const handleModal = useCallback(() => {
    return dispatch(openModal());
  }, []);

  return (
    <button className={style.btn} onClick={handleModal}>
      <AiOutlineLogin />
    </button>
  );
}

export default AuthButton;