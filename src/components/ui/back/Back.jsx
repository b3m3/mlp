import { useNavigate } from 'react-router-dom';

import Button from '../button/Button';

import style from './back.module.scss';

const Back = ({ path }) => {
  const navigate = useNavigate();

  return (
    <div 
      className={style.wrapp}
      onClick={() => navigate(path)}
    >
      <Button left />
    </div>
  );
}

export default Back;