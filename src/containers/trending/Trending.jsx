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

const Trending = ({ item, actors }) => {
  const { results, errorApi } = useFetching(item.url);

  const language = useSelector(state => state.language.language);

  const prevClass = `${item.en.split(' ')[1].toLowerCase()}-tre-prev`;
  const nextClass = `${item.en.split(' ')[1].toLowerCase()}-tre-next`;

  const slideStyle = {maxWidth: actors ? "193px" : "500px"}

  const title = item[language];

  const navigation = useMemo(() => {
    return {
      prevEl: `.${prevClass}`,
      nextEl: `.${nextClass}`
    }
  }, [prevClass, nextClass]);

  return (
    <div className={style.wrapp}>
      <h2>{title}</h2>

      <SliderNavigation 
        prevClass={prevClass}
        nextClass={nextClass}
      />
      
      {errorApi
        ? <ErrorApi />
        : <Swiper
            className={style.swiper}
            style={{width: '100%'}}
            modules={[Pagination, Navigation, Parallax, FreeMode]}
            speed={800}
            spaceBetween={20}
            loop={true}
            parallax={!actors && true}
            freeMode={actors && true}
            pagination={{clickable: true}}
            centeredSlides={!actors && true}
            navigation={navigation}
            slidesPerView={'auto'}
          >
            {results
              ? results.results.slice(0, 10).map(props => (
                  <SwiperSlide key={props.id} style={slideStyle}>
                    {actors
                      ? <TrendingActorCard type={item.type} {...props}/>
                      : <TrendingVideoCard type={item.type} {...props} />
                    }
                  </SwiperSlide>
                ))
              : <>
                  {[...Array(3)].map((_, i) => (
                    <SwiperSlide key={i} style={slideStyle}>
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