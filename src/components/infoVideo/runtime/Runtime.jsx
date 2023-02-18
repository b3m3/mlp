import { AiFillClockCircle } from 'react-icons/ai'

import style from './runtime.module.scss';
import { useCallback } from 'react';

const Runtime = ({ runtime, episodeRuntime }) => {
  const convertTvTime = useCallback(() => {
    if (episodeRuntime && episodeRuntime.length) {
      const h = Math.floor(episodeRuntime[0] / 60);
      const m = episodeRuntime[0] % 60;
      return h > 0 ? `${h}h ${m}m` : `${m}m`;
    }
  }, [episodeRuntime]);

  const converteMovieTime = useCallback(() => {
    if (runtime) {
      const h = Math.floor(runtime / 60);
      const m = runtime % 60;
      return h > 0 ? `${h}h ${m}m` : `${m}m`;
    }
  }, [runtime]);

  return (
    <>
      {runtime
        ? <div className={style.wrapp}>
            <AiFillClockCircle />
            <h4>{converteMovieTime()}</h4>
          </div>
        : episodeRuntime && episodeRuntime.length > 0 &&
          <div className={style.wrapp}>
            <AiFillClockCircle />
            <h4>{convertTvTime()}</h4>
          </div>
      }
    </>
  );
}

export default Runtime;