import { getRatingNum } from '../../../utils/functions';

import { AiFillStar } from 'react-icons/ai';

import style from './rating.module.scss';

const Rating = ({ rating }) => {
  return (
    <>
      {rating && rating > 0 
        ? <div className={style.wrapp}>
            <AiFillStar />
            <h4>{getRatingNum(rating)}</h4>
          </div>
        : null
      }
    </>
  );
}

export default Rating;