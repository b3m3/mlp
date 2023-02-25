import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper';
import { useFetching } from '../../../hooks/useFetching';

import VideoCard from '../../ordinary/videoCard/VideoCard';
import ActorCard from '../../ordinary/actorCard/ActorCard';
import SliderNavigation from '../../ui/sliderNavigation/SliderNavigation';
import ShimmerSolidBlock from '../../ui/shimmers/shimmerSolidBlock/ShimmerSolidBlock';
import ShimmerActorCard from '../../ui/shimmers/shimmerActorCard/ShimmerActorCard';

import { getTitleLang } from '../../../utils/functions';

import style from './credits.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/free-mode";

const breakPoints = {
  320: {slidesPerView: 2},
  420: {slidesPerView: 3},
  550: {slidesPerView: 4},
  700: {slidesPerView: 5}
};

const breakPointsFull = {
  320: {slidesPerView: 2},
  600: {slidesPerView: 4},
  850: {slidesPerView: 6},
  1100: {slidesPerView: 8}
};

const Credits = ({ url, titles, prevClass, nextClass, resultName, actors, fullContainer }) => {
  const language = useSelector(state => state.language.language);

  const type = titles[0].en === 'Movies' ? '/movie' : '/tv';

  const title = getTitleLang(titles, language);

  const navigation = useMemo(() => {
    return {
      prevEl: `.${prevClass}`,
      nextEl: `.${nextClass}`
    }
  }, [prevClass, nextClass])

  const { results } = useFetching(url);

  return (
    <>
      {results && results[resultName].length > 0 &&
        <div className={style.wrapp}>
          <div className={style.top}>
            <h2>{title}</h2>
            {results[resultName].length > 5 &&
              <SliderNavigation
                prevClass={prevClass}
                nextClass={nextClass}
              />
            }
          </div>

          <Swiper
            style={{width: '100%'}}
            modules={[Navigation, FreeMode]}
            spaceBetween={10}
            loop={results[resultName].length > 5 ? true : false}
            breakpoints={ fullContainer ? breakPointsFull : breakPoints}
            navigation={navigation}
            freeMode={true}
          >
            {results 
              ? results[resultName].map(props => (
                  <SwiperSlide key={props.credit_id ? props.credit_id : props.id}>
                    {actors 
                      ? <ActorCard {...props} /> 
                      : <VideoCard {...props} type={type} small />
                    }
                  </SwiperSlide>
                ))
              : <>
                  {[...Array(3)].map((_, i) => (
                    <SwiperSlide key={i}>
                      {actors
                        ? <ShimmerActorCard />
                        : <ShimmerSolidBlock />
                      }
                    </SwiperSlide>
                  ))}
                </>
            }
          </Swiper>
        </div>
      }
    </>
  );
}

export default Credits;