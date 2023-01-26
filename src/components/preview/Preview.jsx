import { useState, useEffect, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';

import VideoCard from '../videoCard/VideoCard';
import ActorCard from '../actorCard/ActorCard';
import SeeAll from '../ui/seeAll/SeeAll';

import { getApiResults } from '../../service/getApiResources';
import { Context } from '../../context/context';

import style from './preview.module.scss';
import 'swiper/css';
import 'swiper/css/scrollbar';

const Preview = ({ item, actors }) => {
  const [results, setResults] = useState(null);
  const [errorApi, setErrorApi] = useState(false);

  const { currentLang } = useContext(Context);

  useEffect(() => {
    getApiResults(item.url, setResults, setErrorApi);
  }, [item.url]);

  return (
    <div className={style.preview}>
      <div className={style.top}>
        <h2>{item[currentLang]}</h2>
        <SeeAll category={item.en}/>
      </div>
      
      {errorApi
        ? <h2>Error</h2>
        : <Swiper
            className={style.swiper}
            modules={[Scrollbar]}
            spaceBetween={10}
            scrollbar={{draggable: true}}
            speed={800}
            breakpoints={{
              320: {slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 5},
              475: {slidesPerView: 3, slidesPerGroup: 3},
              768: {slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 8},
              1024: {slidesPerView: 6, slidesPerGroup: 6, spaceBetween: 10}
            }}
          >
            {results &&
              results.results.slice(0, 12).map(props => (
                <SwiperSlide key={props.id}>
                  {actors ? <ActorCard {...props} /> : <VideoCard {...props}  />}
                </SwiperSlide>
              ))
            }
          </Swiper>
      }
    </div>
  );
}

export default Preview;