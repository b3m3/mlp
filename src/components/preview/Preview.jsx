import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';

import VideoCard from '../videoCard/VideoCard';
import ActorCard from '../actorCard/ActorCard';
import SeeAll from '../ui/seeAll/SeeAll';
import ErrorApi from '../errors/errorApi/ErrorApi';
import ShimmerVideoCard from '../ui/shimmers/shimmerVideoCard/ShimmerVideoCard';
import ShimmerActorCard from '../ui/shimmers/shimmerActorCard/ShimmerActorCard';

import { getApiResults } from '../../service/getApiResources';

import style from './preview.module.scss';
import 'swiper/css';
import 'swiper/css/scrollbar';

const breakPoints = {
  320: {slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 5},
  475: {slidesPerView: 3, slidesPerGroup: 3},
  768: {slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 8},
  1024: {slidesPerView: 6, slidesPerGroup: 6, spaceBetween: 10}
};

const Preview = ({ item, actors }) => {
  const [results, setResults] = useState(null);
  const [errorApi, setErrorApi] = useState(false);

  const language = useSelector(state => state.language.language);

  const title = item[language];

  useEffect(() => {
    getApiResults(item.url, setResults, setErrorApi);
  }, [item.url]);

  return (
    <div className={style.preview}>
      <div className={style.top}>
        <h2>{title}</h2>
        <SeeAll category={item.en}/>
      </div>
      
      {errorApi
        ? <ErrorApi />
        : <Swiper
            className={style.swiper}
            modules={[Scrollbar]}
            spaceBetween={10}
            scrollbar={{draggable: true}}
            speed={800}
            breakpoints={breakPoints}
          >
            {results
              ? results.results.slice(0, 12).map(props => (
                  <SwiperSlide key={props.id}>
                    {actors ? <ActorCard {...props}/> : <VideoCard {...props}/>}
                  </SwiperSlide>
                ))
              : <>
                  {[...Array(7)].map((_, i) =>
                    <SwiperSlide key={i}>
                      {actors ? <ShimmerActorCard /> : <ShimmerVideoCard />}
                    </SwiperSlide>
                  )}
                </>
            }
          </Swiper>
      }
    </div>
  );
}

export default Preview;