import {AiOutlineUser} from 'react-icons/ai';

import style from './user.module.scss';

const User = () => {
  return (
    <button className={style.user}>
      <AiOutlineUser/>
    </button>
  );
}

export default User;