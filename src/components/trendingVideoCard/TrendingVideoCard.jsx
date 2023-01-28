import { useContext } from 'react';

import { Context } from '../../context/context';

import Backdrop from '../ui/backdrop/Backdrop';
import Rating from '../ui/rating/Rating';
import GetInfoBtn from '../ui/getInfoBtn/GetInfoBtn';
import Dates from '../ui/dates/Dates';
import Genres from '../genres/Genres';

import style from './trending-video-card.module.scss';

const TrendingVideoCard = ({id, backdrop_path, first_air_date, genre_ids, release_date, vote_average, title, name, type}) => {
  const { menuActive } = useContext(Context);
  
  return (
    <div className={style.wrapp}>
      <Backdrop path={backdrop_path} />

      <div className={style.body}>
        <div className={style.content}>

          <div className={style.info}>
            <div className={style.row}>
              <Rating rating={vote_average} />
              <Dates release={release_date} first={first_air_date}  />
              <GetInfoBtn id={id} type={type} />
            </div>
            <div className={style.row} style={menuActive ? {opacity: 0} : null}>
              <Genres type={type} ids={genre_ids} />
            </div>
          </div>

          <h2>{title ? title : name}</h2>
        </div>
      </div>
    </div>
  );
}

export default TrendingVideoCard;