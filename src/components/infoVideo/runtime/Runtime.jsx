import { convertTime } from '../../../utils/functions';

import { AiFillClockCircle } from 'react-icons/ai'

import style from './runtime.module.scss';

const Runtime = ({ runtime, episodeRuntime }) => {
  return (
    <>
      {runtime
        ? <div className={style.wrapp}>
            <AiFillClockCircle />
            <h4>{convertTime(runtime)}</h4>
          </div>
        : episodeRuntime && episodeRuntime.length > 0 &&
          <div className={style.wrapp}>
            <AiFillClockCircle />
            <h4>{convertTime(episodeRuntime)}</h4>
          </div>
      }
    </>
  );
}

export default Runtime;