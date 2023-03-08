import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import { useFetching } from '../../hooks/useFetching';

import VideoCard from '../../components/ordinary/videoCard/VideoCard';
import ActorCard from '../../components/ordinary/actorCard/ActorCard';
import SeeAllButton from '../../components/ui/seeAllButton/SeeAllButton';
import ErrorApi from '../../components/ui/errors/errorApi/ErrorApi';
import ShimmerVideoCard from '../../components/ui/shimmers/shimmerVideoCard/ShimmerVideoCard';
import ShimmerActorCard from '../../components/ui/shimmers/shimmerActorCard/ShimmerActorCard';

import style from './preview.module.scss';
import 'swiper/css';
import "swiper/css/free-mode";

const Preview = ({ item, actors }) => {
  const language = useSelector(state => state.language.language);
  const {results, errorApi} = useFetching(item.url);
  
  const title = item[language];

  return (
    <div className={style.wrapp}>
      <div className={style.top}>
        <h2>{title}</h2>
        <SeeAllButton category={item.en}/>
      </div>
      
      {errorApi
        ? <ErrorApi />
        : <Swiper
            className={style.swiper}
            modules={[FreeMode]}
            spaceBetween={12}
            speed={800}
            freeMode={true}
            slidesPerView={'auto'}
          >
            {results
              ? results.results.slice(0, 10).map(props => (
                  <SwiperSlide key={props.id} className={style.slide}>
                    {actors ? <ActorCard {...props}/> : <VideoCard {...props}/>}
                  </SwiperSlide>
                ))
              : <>
                  {[...Array(7)].map((_, i) =>
                    <SwiperSlide key={i} className={style.slide}>
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