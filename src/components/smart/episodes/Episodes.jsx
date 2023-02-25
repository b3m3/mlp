import { useMemo } from 'react';

import Poster from '../../ui/poster/Poster';
import Rating from '../../ordinary/rating/Rating';
import Votes from '../../ordinary/votes/Votes';
import Runtime from '../../ordinary/runtime/Runtime';
import ActorCard from '../../ordinary/actorCard/ActorCard';

import style from './episodes.module.scss';

const Episodes = ({ results, episodeNumber }) => {
  const item = useMemo(() => {
    return results && results.length > 0 && {
      id: results[episodeNumber].id,
      name: results[episodeNumber].name,
      vote_count: results[episodeNumber].vote_count,
      vote_average: results[episodeNumber].vote_average,
      overview: results[episodeNumber].overview,
      runtime: results[episodeNumber].runtime,
      still_path: results[episodeNumber].still_path,
      guest_stars: results[episodeNumber].guest_stars
    }
  }, [results, episodeNumber]);

  const { id, still_path, vote_count, name, vote_average, overview, runtime, guest_stars } = item;
  
  return (
    <div className={style.wrapp}>
      {results && 
        <div key={id} className={style.body}>
          <div className={style.top}>
            <div className={style.col}>
              <Poster path={still_path} />
            </div>
            <div className={style.col}>
              <div className={style.row}>
                <h4>{name}</h4>
              </div>
              <div className={style.row}>
                <Votes vote_count={vote_count} />
                <Rating rating={vote_average} />
                <Runtime runtime={runtime} />
              </div>
              <div className={style.row}>
                <p>{overview}</p>
              </div>
            </div>
          </div>
          {guest_stars && guest_stars.length > 0 &&
            <ul className={style.actors}>
              {guest_stars.map((props, i) => (
                <li key={props.id + i}>
                  <ActorCard {...props} />
                </li>
              ))}
            </ul>
          }
        </div>
      }
    </div>
  );
}

export default Episodes;