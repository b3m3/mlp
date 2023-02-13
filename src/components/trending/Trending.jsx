import { useState, useEffect, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Parallax, FreeMode } from 'swiper';

import TrendingVideoCard from '../trendingVideoCard/TrendingVideoCard';
import TrendingActorCard from '../trendingActorCard/TrendingActorCard';
import SliderNavigation from '../ui/sliderNavigation/SliderNavigation';
import ErrorApi from '../errors/errorApi/ErrorApi';
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

  const prevClass = `${item.en.split(' ')[1].toLowerCase()}-tre-prev`;
  const nextClass = `${item.en.split(' ')[1].toLowerCase()}-tre-next`;

  useEffect(() => {
    getApiResults(item.url, setResults, setErrorApi);
  }, [item.url, currentLang]);

  return (
    <div className={style.wrapp}>
      <div className={style.top}>
        <h2>{item[currentLang]}</h2>

        <SliderNavigation 
          prevClass={prevClass}
          nextClass={nextClass}
        />
      </div>
      
      {errorApi
        ? <ErrorApi />
        : <Swiper
            className={style.swiper}
            style={{width: '100%'}}
            modules={[Navigation, Pagination, Parallax]}
            speed={800}
            parallax={true}
            pagination={!actors && {clickable: true}}
            centeredSlides={!actors && true}
            initialSlide={3}
            spaceBetween={20}
            loop={true}
            navigation={{
              prevEl: `.${prevClass}`,
              nextEl: `.${nextClass}`
            }}
            breakpoints={
              actors
                ? {
                    320: {slidesPerView: 2},
                    768: {slidesPerView: 3},
                    1024: {slidesPerView: 5}
                  }
                : {
                    320: {slidesPerView: 1},
                    1024: {slidesPerView: 2}
                  }
          }
          >
            {results &&
              results.results.map(props => (
                <SwiperSlide key={props.id}>
                  {actors
                    ? <TrendingActorCard type={item.type} {...props}/>
                    : <TrendingVideoCard type={item.type} {...props} />
                  }
                </SwiperSlide>
              ))
            }

            {!results && !actors &&
              <div className={style.shimers_wrapp}>
                {[...Array(3)].map((_, i) => <div key={i}><ShimmerSolidBlock /></div>)}
              </div>
            }
          </Swiper>
      }
    </div>
  );
}

export default Trending;