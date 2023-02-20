import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../../ui/button/Button';

import { API_ROOT, API_KEY, API_LANGUAGE, API_VIDEOS, 
  YOUTUBE_TRAILER_ROOT, YOUTUBE_TRAILER_AUTOPLAY } from '../../../constants/api';
import { getApiResources } from '../../../service/getApiResources';

import { GoPlay } from 'react-icons/go';
import { AiFillCloseCircle } from 'react-icons/ai';

import style from './trailers.module.scss';

const Trailers = ({activeTrailer, setActiveTrailer}) => {
  const [results, setResults] = useState(null);
  const [totalTrailers, setTotalTrailers] = useState(null);
  const [trailerNumber, setTrailerNumber] = useState(0);

  const language = useSelector(state => state.language.language);
  const { id, type } = useParams();

  const lock = {opacity: '.1', pointerEvents: 'none'};

  const url = `${API_ROOT}/${type}/${id}${API_VIDEOS}${API_KEY}${API_LANGUAGE}${language}`;

  useEffect(() => {
    (async() => {
      const res = await getApiResources(url);

      if (res) {
        setTotalTrailers(res.results.length);
        setTrailerNumber(0);
        setResults(res.results);
      }

      if (res.results.length === 0) {
        setActiveTrailer(0);
      }
    })();
  }, [url, language, setActiveTrailer]);

  return (
    <div className={`${style.wrapp} ${activeTrailer && results.length > 0 && style.active}`}>
      {results && results.length > 0 &&
        <>
          {activeTrailer
            ? <>
                <iframe
                  title={' '}
                  src={YOUTUBE_TRAILER_ROOT+results[trailerNumber].key+YOUTUBE_TRAILER_AUTOPLAY}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                />
                
                <div 
                  onClick={() => trailerNumber > 0 && setTrailerNumber(trailerNumber -1)}
                  className={style.prev}
                  style={trailerNumber < 1 ? lock : null}
                >
                  <Button left />
                </div>

                <div 
                  onClick={() => totalTrailers && trailerNumber < (totalTrailers -1) && setTrailerNumber(trailerNumber +1)}
                  className={style.next}
                  style={totalTrailers && trailerNumber >= (totalTrailers-1) ? lock : null}
                >
                  <Button />
                </div>

                <div 
                  onClick={() => setActiveTrailer(false)}
                  className={style.close}
                >
                  <AiFillCloseCircle style={{fontSize: '25px'}} />
                </div>
              </>
            : <GoPlay
                className={style.play} 
                onClick={() => setActiveTrailer(true)} 
              />
          }
        </>
      }
    </div>
  );
}

export default Trailers;