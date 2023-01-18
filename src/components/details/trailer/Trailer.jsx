import Button from '../../ui/button/Button';
import Shimmer from '../../ui/shimmer/Shimmer';

import { YOUTUBE_TRAILER_ROOT, YOUTUBE_TRAILER_AUTOPLAY } from '../../../constans/api';

import { GoPlay } from 'react-icons/go';
import { AiFillCloseCircle } from 'react-icons/ai';

import style from './trailer.module.scss';

const Trailer = ({ 
  onActive, isActive, videoKey, trailerNumber, totalTrailers, prevTrailer, nextTrailer, onClose 
}) => {

  const lock = {opacity: '.1', pointerEvents: 'none'};

  return (
    <div className={style.wrapp}>
      {isActive      
        ? <>
            {videoKey &&
              <iframe
                src={YOUTUBE_TRAILER_ROOT+videoKey+YOUTUBE_TRAILER_AUTOPLAY}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              />
            }
            
            <div 
              onClick={prevTrailer}
              className={style.prev}
              style={trailerNumber < 1 ? lock : null}
            >
              <Button left />
            </div>

            <div 
              onClick={nextTrailer}
              className={style.next}
              style={totalTrailers && trailerNumber >= (totalTrailers-1) ? lock : null}
            >
              <Button />
            </div>

            <div 
              onClick={onClose}
              className={style.close}
            >
              <AiFillCloseCircle style={{fontSize: '25px'}} />
            </div>
          </>
        : <>
            <GoPlay
              className={style.play} 
              onClick={onActive} 
            />
          </>
      }
    </div>
  );
}

export default Trailer;