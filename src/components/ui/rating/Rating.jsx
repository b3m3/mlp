import { AiFillStar } from 'react-icons/ai';

import style from './rating.module.scss';

const Rating = ({ rating }) => {
  return (
  <div className={style.wrapp}>
    <AiFillStar />
    <h4>{rating && rating.toFixed(1)}</h4>
  </div>
  );
}

export default Rating;