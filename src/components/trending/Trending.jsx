import { useState, useEffect, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectCards, EffectCoverflow } from 'swiper';

import TrendingVideoCard from '../trendingVideoCard/TrendingVideoCard';
import TrendingActorCard from '../trendingActorCard/TrendingActorCard';
import SliderNavigation from '../ui/sliderNavigation/SliderNavigation';
import Error from '../error/Error';
import ShimmerSolidBlock from '../ui/shimmers/shimmerSolidBlock/ShimmerSolidBlock';

import { getApiResults } from '../../service/getApiResources';
import { Context } from '../../context/context';

import style from './trending.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';

const Trending = ({ item, actors }) => {
  const [results, setResults] = useState(null);
  const [errorApi, setErrorApi] = useState(false);

  const { currentLang } = useContext(Context);

  const swiperWidthCards = {width: '85%'};
  const swiperWidthActors = {width: '100%'};

  useEffect(() => {
    getApiResults(item.url, setResults, setErrorApi);
  }, [item.url, currentLang]);

  return (
    <div className={style.wrapp}>
      <div className={style.top}>
        <h2>{item[currentLang]}</h2>
      </div>
      
      {errorApi
        ? <Error />
        : <Swiper
            className={style.swiper}
            style={actors ? swiperWidthActors : swiperWidthCards}
            modules={[Navigation, Pagination, EffectCards, EffectCoverflow]}
            effect={actors ? "coverflow" : "cards"}
            slidesPerView={actors ? 2 : 1}
            initialSlide={5}
            loop={true}
            pagination={{ clickable: true }}
            breakpoints={actors && {
              320: {slidesPerView: 1},
              475: {slidesPerView: 2},
              768: {slidesPerView: 3}
            }}
            navigation={{
              prevEl: '.tre-prev',
              nextEl: '.tre-next'
            }}
          >
            {results
              ? results.results.slice(0, 9).map(props => (
                  <SwiperSlide key={props.id}>
                    {actors
                      ? <TrendingActorCard type={item.type} {...props}/>
                      : <TrendingVideoCard type={item.type} {...props} />
                    }
                  </SwiperSlide>
                ))
              : <>
                  {[...Array(3)].map((v, i) =>
                    <SwiperSlide key={i}>
                      <ShimmerSolidBlock />
                    </SwiperSlide>
                  )}
                </>
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