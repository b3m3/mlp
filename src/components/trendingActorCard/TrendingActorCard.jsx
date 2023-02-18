import Backdrop from '../ui/backdrop/Backdrop';
import GetInfoBtn from '../ui/getInfoBtn/GetInfoBtn';

import style from './trending-actor-card.module.scss';

const TrendingActorCard = ({ id, type, original_name, profile_path }) => {
  return (
    <div className={style.wrapp}>
      <Backdrop path={profile_path} light />

      <div className={style.body}>
        <div className={style.content}>
          <div className={style.row}>
            <h2>{original_name && original_name}</h2>
          </div>
          <div className={style.row}>
            <GetInfoBtn id={id} type={type} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingActorCard;