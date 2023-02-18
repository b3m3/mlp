import { useCallback } from 'react';
import { AiFillStar } from 'react-icons/ai';

import style from './rating.module.scss';

const Rating = ({ rating }) => {
  const getRating = useCallback(() => {
    const arr = rating.toString().split('.')[1];
    if (arr) 
      return `${rating.toString().split('.')[0]}.${rating.toString().split('.')[1][0]}`;
    return rating;
  }, [rating]);

  return (
    <>
      {rating && rating > 0 
        ? <div className={style.wrapp}>
            <AiFillStar />
            <h4>{getRating()}</h4>
          </div>
        : null
      }
    </>
  );
}

export default Rating;