import { Link, useNavigate } from 'react-router-dom';

import Button from '../ui/button/Button';

import ErrorImg from './img/error.webp';

import style from './error.module.scss';

const Error = ({ navigation }) => {
  const navigate = useNavigate();
  return (
    <div className={style.wrapp}>
      {navigation &&
        <span onClick={() => navigate(-1)}>
          <Button left/>
        </span>
      }
      <div>
        <img className={style.img} src={ErrorImg} alt="error" />
      </div>
      <p>Go back or reload the page</p>
    </div>
  );
}

export default Error;