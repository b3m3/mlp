import Back from '../../back/Back';

import ErrorImg from './img/error.webp';

import style from './error-api.module.scss';

const ErrorApi = ({ navigation }) => {
  return (
    <div className={style.wrapp}>
      {navigation && <Back path={-1}/>}

      <div className={style.body}>
        <img src={ErrorImg} alt="error" />
      </div>
    </div>
  );
}

export default ErrorApi;