import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Parallax, FreeMode } from 'swiper';
import { useSelector } from 'react-redux';
import { useFetching } from '../../hooks/useFetching';

import TrendingVideoCard from '../../components/ordinary/trendingVideoCard/TrendingVideoCard';
import TrendingActorCard from '../../components/ordinary/trendingActorCard/TrendingActorCard';
import SliderNavigation from '../../components/ui/sliderNavigation/SliderNavigation';
import ErrorApi from '../../components/ui/errors/errorApi/ErrorApi';
import ShimmerSolidBlock from '../../components/ui/shimmers/shimmerSolidBlock/ShimmerSolidBlock';

import style from './trending.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';
import "swiper/css/free-mode";

const breakPoints = {
  320: {slidesPerView: 1},
  768: {slidesPerView: 1.5},
  1025: {slidesPerView: 2}
};

const breakPointsActors = {
  320: {slidesPerView: 1},
  376: {slidesPerView: 2},
  601: {slidesPerView: 3},
  1025: {slidesPerView: 4},
  1251: {slidesPerView: 5}
};

const Trending = ({ item, actors }) => {
  const { results, errorApi } = useFetching(item.url);

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
        : <Swiper
            className={style.swiper}
            style={{width: '100%'}}
            modules={[Navigation, Pagination, Parallax, FreeMode]}
            speed={800}
            initialSlide={3}
            spaceBetween={20}
            loop={true}
            parallax={true}
            freeMode={actors && true}
            // pagination={!actors && {clickable: true}}
            centeredSlides={!actors && true}
            navigation={navigation}
            breakpoints={actors ? breakPointsActors : breakPoints}
          >
            {results
              ? results.results.slice(0, 10).map(props => (
                  <SwiperSlide key={props.id} >
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