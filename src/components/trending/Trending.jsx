import { useState, useEffect, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectCards } from 'swiper';

import TrendingVideoCard from '../trendingVideoCard/TrendingVideoCard';
import SeeAll from '../ui/seeAll/SeeAll';
import SliderNavigation from '../ui/sliderNavigation/SliderNavigation';

import { getApiResults } from '../../service/getApiResources';
import { Context } from '../../context/context';

import style from './trending.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/effect-cards";
import 'swiper/css/navigation';

const Trending = ({ item, actors }) => {
  const [results, setResults] = useState(null);
  const [errorApi, setErrorApi] = useState(false);

  const { currentLang } = useContext(Context);

  useEffect(() => {
    getApiResults(item.url, setResults, setErrorApi);
  }, [item.url, currentLang]);

  return (
    <div className={style.wrapp}>
      <div className={style.top}>
        <h2>{item[currentLang]}</h2>
      </div>
      
      {errorApi
        ? <h2>Error</h2>
        : <Swiper
            className={style.swiper}
            modules={[Navigation, Pagination, EffectCards]}
            effect={"cards"}
            
            initialSlide={5}
            loop={true}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: '.tre-prev',
              nextEl: '.tre-next'
            }}
          >
            {results && 
              results.results.slice(0, 9).map(props => (
                <SwiperSlide key={props.id}>
                  <TrendingVideoCard 
                    type={item.type}
                    {...props} 
                  />
                </SwiperSlide>
              ))
            }

            <div className={style.navigation}>
              <SliderNavigation 
                prevClass={'tre-prev'}
                nextClass={'tre-next'}
                big
              />
            </div>
          </Swiper>
      }
    </div>
  );
}

export default Trending;