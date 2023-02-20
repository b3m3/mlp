import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Poster from '../../ui/poster/Poster';
import Rating from '../../ui/rating/Rating';
import Dates from '../../ui/dates/Dates';

import { API_ROOT, API_KEY, API_REVIEWS } from '../../../constants/api';
import { getApiResources } from '../../../service/getApiResources';
import { getTitleLang } from '../../../utils/functions';

import { MdOutlineCloseFullscreen, MdOutlineOpenInFull } from 'react-icons/md';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

import style from './reviews.module.scss';

const titles = [
  {en: 'Reviews', ru: 'Отзывы', uk: 'Відгуки'}
];

const Reviews = () => {
  const [results, setResults] = useState(null);
  const [numberResults, setNumberResults] = useState(3);
  const [isOpen, setIsOpen] = useState(null);

  const { type, id } = useParams();
  const language = useSelector(state => state.language.language);

  const url = `${API_ROOT}/${type}/${id}${API_REVIEWS}${API_KEY}`;

  const title = getTitleLang(titles, language)

  useEffect(() => {
    (async() => {
      const res = await getApiResources(url);
      return res && setResults(res);
    })();

    setNumberResults(3);
    setIsOpen(false);
  }, [type, url]);

  return (
    <>
      {results && results.results.length > 0 &&
        <div className={style.wrapp}>
          <h2>{title}</h2>
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