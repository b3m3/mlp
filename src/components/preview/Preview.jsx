import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getApiResults } from '../../service/getApiResources';
import Card from '../card/Card';

import style from './preview.module.scss';
import 'swiper/css';

const Preview = ({ title, url }) => {
  const [results, setResults] = useState(null);
  const [errorApi, setErrorApi] = useState(false);

  useEffect(() => {
    getApiResults(url, setResults, setErrorApi);
  }, [url]);

  return (
    <div className={style.preview}>
      <div className={style.top}>
        <h2>{title}</h2>
        <Link to={''}>
          See all
        </Link>
      </div>
      
      {errorApi
        ? <h2>Error</h2>
        : <Swiper
            className={style.swiper}
            spaceBetween={15}
            slidesPerView={'auto'}
          >
            {results && results.map(props => (
              <SwiperSlide 
                key={props.id} 
                className={style.slide}
              >
                <Card {...props} />
              </SwiperSlide>
            ))}
          </Swiper>
      }
    </div>
  );
}

export default Preview;