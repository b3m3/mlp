import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Poster from '../../ui/poster/Poster';
import Rating from '../../ui/rating/Rating';
import Dates from '../dates/Dates';

import { API_ROOT, API_KEY, API_REVIEWS } from '../../../constans/api';
import { getApiResources } from '../../../service/getApiResources';
import { Context } from '../../../context/context';

import { MdOutlineCloseFullscreen, MdOutlineOpenInFull } from 'react-icons/md';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

import style from './reviews.module.scss';

const Reviews = () => {
  const [results, setResults] = useState(null);
  const [numberResults, setNumberResults] = useState(3);
  const [isOpen, setIsOpen] = useState(null);

  const { mediaType, videoId } = useParams();
  const { currentLang } = useContext(Context);

  const titles = [{en: 'Reviews'},{ru: 'Отзывы'},{uk: 'Відгуки'}];

  const url = `${API_ROOT}/${mediaType}/${videoId}${API_REVIEWS}${API_KEY}`;

  useEffect(() => {
    (async() => {
      const res = await getApiResources(url);
      return res && setResults(res);
    })();

    setNumberResults(3);
    setIsOpen(false);
  }, [mediaType, url]);

  return (
    <>
      {results && results.results.length > 0 &&
        <div className={style.wrapp}>
          <h2>{titles.map(t => t[currentLang])}</h2>
          {results.results.slice(0, numberResults).map(({ id, author_details, created_at, content}, i) => (
            <div 
              key={id}
              className={`${style.body} ${isOpen === i && style.open}`}
            >
              <div className={style.avatar}>
                <Poster path={author_details.avatar_path} />
              </div>

              <div className={style.col}>
                <h4>{author_details.name ? author_details.name : 'User'}</h4>
                <div className={style.row}>
                  <Rating rating={author_details.rating && author_details.rating} />
                  <Dates fullDate={created_at} />
                </div>
                <p>{content && content}</p>
              </div>

              <span 
                className={style.icon}
                onClick={() => isOpen !== i ? setIsOpen(i) : setIsOpen(null)}
              >
                {isOpen === i ? <MdOutlineOpenInFull /> : <MdOutlineCloseFullscreen />}
              </span>
            </div>
          ))}
          {results &&
            <>
              {results.results.length > 3 &&
                <button
                  className={style.more}
                  onClick={() => numberResults < results.results.length
                    ? setNumberResults(r => r + r)
                    : setNumberResults(3)
                  }
                >
                  {numberResults < results.results.length
                    ? <IoIosArrowDown />
                    : <IoIosArrowUp />
                  }
                </button>
              }
            </>
          }
        </div>
      }
    </>
  );
}

export default Reviews;