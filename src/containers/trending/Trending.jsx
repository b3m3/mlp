import { useState, useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Parallax } from 'swiper';
import { useSelector } from 'react-redux';

import TrendingVideoCard from '../../components/smart/trendingVideoCard/TrendingVideoCard';
import TrendingActorCard from '../../components/smart/trendingActorCard/TrendingActorCard';
import SliderNavigation from '../../components/ui/sliderNavigation/SliderNavigation';
import ErrorApi from '../../components/ui/errors/errorApi/ErrorApi';
import ShimmerSolidBlock from '../../components/ui/shimmers/shimmerSolidBlock/ShimmerSolidBlock';

import { getApiResults } from '../../service/getApiResources';

import style from './trending.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';

const breakPoints = {
  320: {slidesPerView: 1},
  1025: {slidesPerView: 2}
};

const breakPointsActors = {
  320: {slidesPerView: 1},
  376: {slidesPerView: 2},
  601: {slidesPerView: 3},
  1025: {slidesPerView: 5}
};

const Trending = ({ item, actors }) => {
  const [results, setResults] = useState(null);
  const [errorApi, setErrorApi] = useState(false);

  const language = useSelector(state => state.language.language);

  const prevClass = `${item.en.split(' ')[1].toLowerCase()}-tre-prev`;
  const nextClass = `${item.en.split(' ')[1].toLowerCase()}-tre-next`;

  const title = item[language];

  const navigation = useMemo(() => {
    return {
      prevEl: `.${prevClass}`,
      nextEl: `.${nextClass}`
    }
  }, [prevClass, nextClass]);

  useEffect(() => {
    getApiResults(item.url, setResults, setErrorApi);
  }, [item.url, language]);

  return (
    <div className={style.wrapp}>
      <div className={style.top}>
        <h2>{title}</h2>

        <SliderNavigation 
          prevClass={prevClass}
          nextClass={nextClass}
        />
      </div>
      
      {errorApi
        ? <ErrorApi />
        : 
          <Swiper
            className={style.swiper}
            style={{width: '100%'}}
            modules={[Navigation, Pagination, Parallax]}
            speed={800}
            parallax={true}
            pagination={!actors && {clickable: true}}
            initialSlide={3}
            spaceBetween={20}
            loop={true}
            navigation={navigation}
            breakpoints={actors ? breakPointsActors : breakPoints}
            centeredSlides={!actors && true}
          >
            {results
              ? results.results.map(props => (
                  <SwiperSlide key={props.id}>
                    {actors
                      ? <TrendingActorCard type={item.type} {...props}/>
                      : <TrendingVideoCard type={item.type} {...props} />
                    }
                  </SwiperSlide>
                ))
              : <>
                  {[...Array(3)].map((_, i) => (
                    <SwiperSlide key={i}>
                      <ShimmerSolidBlock />
                    </SwiperSlide>
                  ))}
                </>
            }
          </Swiper>
      }
    </div>
  );
}

export default Trending;