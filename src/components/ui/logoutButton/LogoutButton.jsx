import { RiLogoutCircleLine } from 'react-icons/ri';

import style from './logout-button.module.scss';

const LogoutButton = ({ handleLogout, username }) => {
  return (
    <button className={style.btn} onClick={handleLogout}>
      {username ? username : 'Logout'}
      <RiLogoutCircleLine />

      <span>Logout</span>
    </button>
  );
}

export default LogoutButton;