import LoadingSvg from './img/loading.svg';

import style from './loading.module.scss';

const Loading = () => {
  return (
    <div className={style.wrapp}>
      <img src={LoadingSvg} alt="loading" />
    </div>
  );
}

export default Loading;