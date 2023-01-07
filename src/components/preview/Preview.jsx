import { useState, useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import Card from '../card/Card';
import SeeAll from '../ui/seeAll/SeeAll';
import { getApiResults } from '../../service/getApiResources';

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
        <SeeAll title={title}/>
      </div>
      
      {errorApi
        ? <h2>Error</h2>
        : <Swiper
            className={style.swiper}
            spaceBetween={15}
            slidesPerView={'auto'}
          >
            {results && results.results.map(props => (
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