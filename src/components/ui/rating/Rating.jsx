import { AiFillStar } from 'react-icons/ai';

import style from './rating.module.scss';

const Rating = ({ rating }) => {
  return (
    <>
      {rating && 
        <div className={style.wrapp}>
          <AiFillStar />
          <h4>
            {rating.toString().split('.')[1] 
              ? `${rating.toString().split('.')[0]}.${rating.toString().split('.')[1][0]}` 
              : rating
            }
          </h4>
        </div>
      }
    </>
  );
}

export default Rating;