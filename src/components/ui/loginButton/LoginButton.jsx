import { RiLoginCircleLine } from 'react-icons/ri';

import style from './login-button.module.scss';

const LoginButton = ({ handlOpenModal }) => {
  return (
    <button className={style.btn} onClick={handlOpenModal} >
      Login <RiLoginCircleLine />
    </button>
  );
}

export default LoginButton;