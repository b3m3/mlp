import { getRatingNum } from '../../../utils/functions';

import { AiFillStar } from 'react-icons/ai';

import style from './rating.module.scss';

const Rating = ({ rating }) => {
  return (
    <>
      {rating &&
        <div className={style.wrapp}>
          <AiFillStar />
          <h4>{getRatingNum(rating)}</h4>
        </div>
      }
    </>
  );
}

export default Rating;