import { RiLoginCircleLine } from 'react-icons/ri';

import style from './login-button.module.scss';

const LoginButton = ({ handModal }) => {
  return (
    <button className={style.btn} onClick={handModal} >
      Login <RiLoginCircleLine />
    </button>
  );
}

export default LoginButton;