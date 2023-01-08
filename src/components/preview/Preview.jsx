import { useState, useEffect, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import Card from '../card/Card';
import SeeAll from '../ui/seeAll/SeeAll';
import { getApiResults } from '../../service/getApiResources';
import Shimmer from '../ui/shimmer/Shimmer';

import { Context } from '../../context/context';

import style from './preview.module.scss';
import 'swiper/css';

const Preview = ({ item }) => {
  const [results, setResults] = useState(null);
  const [errorApi, setErrorApi] = useState(false);

  const { currentLang } = useContext(Context);
  const { lang } = currentLang;

  useEffect(() => {
    getApiResults(item.url, setResults, setErrorApi);
  }, [item.url]);

  return (
    <div className={style.preview}>
      <div className={style.top}>
        <h2>{item[lang]}</h2>
        <SeeAll category={item.en}/>
      </div>
      
      {errorApi
        ? <h2>Error</h2>
        : <Swiper
            className={style.swiper}
            spaceBetween={15}
            slidesPerView={'auto'}
          >
            {results 
              ? results.results.map(props => (
                <SwiperSlide 
                  key={props.id} 
                  className={style.slide}
                >
                  <Card {...props} />
                </SwiperSlide>
              ))
              : <>
                  {[...Array(5)].map((v, i) => (
                    <SwiperSlide 
                      className={style.slide}
                      key={i}
                    >
                      <Shimmer />
                    </SwiperSlide>
                  ))}
                </>
            }
          </Swiper>
      }
    </div>
  );
}

export default Preview;