import Back from '../../ui/back/Back';

import ErrorImg from './img/error.webp';

import style from './error-api.module.scss';

const ErrorApi = ({ navigation }) => {
  return (
    <div className={style.wrapp}>
      {navigation && <Back path={-1}/>}

      <div className={style.body}>
        <img src={ErrorImg} alt="error" />
        <h4>Go back or reload the page</h4>
      </div>
    </div>
  );
}

export default ErrorApi;