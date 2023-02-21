import { AiFillLike } from 'react-icons/ai';

import style from './votes.module.scss';

const Votes = ({vote_count}) => {
  return (
    <>
      {vote_count && vote_count > 0
        ? <div className={style.wrapp}>
            <AiFillLike />
            <h4>{vote_count}</h4>
          </div>
        : null
      }
    </>
  );
}

export default Votes;