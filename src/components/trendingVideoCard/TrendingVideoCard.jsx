import Backdrop from '../ui/backdrop/Backdrop';
import Rating from '../ui/rating/Rating';
import GetInfoBtn from '../ui/getInfoBtn/GetInfoBtn';
import Dates from '../ui/dates/Dates';
import Genres from '../genres/Genres';

import style from './trending-video-card.module.scss';
import Votes from '../ui/votes/Votes';

const TrendingVideoCard = ({
  id, backdrop_path, first_air_date, genre_ids, release_date, 
  vote_count, vote_average, title, name, type
}) => {
  
  return (
    <div className={style.wrapp}>
      <Backdrop path={backdrop_path} light />

      <div className={style.row}>
        <h2 data-swiper-parallax="-500">{title ? title : name}</h2>
        <div data-swiper-parallax-scale="0">
          <Genres type={type} ids={genre_ids} />
        </div>
      </div>

      <div className={style.row}>
        <div data-swiper-parallax="-150" >
          <Rating rating={vote_average} />
        </div>
        <div data-swiper-parallax="-240">
          <Votes vote_count={vote_count}/>
        </div>
        <div data-swiper-parallax="-330">
          <Dates release={release_date} first={first_air_date}  />
        </div>
        <div data-swiper-parallax="-420">
          <GetInfoBtn id={id} type={type} />
        </div>
      </div>
    </div>
  );
}

export default TrendingVideoCard;