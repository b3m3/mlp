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
            // breakpoints={{
            //   320: {slidesPerView: 1.2},
            //   400: {slidesPerView: 2},
            //   650: {slidesPerView: 3},
            //   900: {slidesPerView: 4},
            //   1025: {slidesPerView: 3},
            //   1100: {slidesPerView: 4},
            //   1300: {slidesPerView: 5}
            // }}
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