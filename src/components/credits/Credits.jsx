import { useState, useEffect, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import VideoCard from '../videoCard/VideoCard';
import ActorCard from '../actorCard/ActorCard';
import SliderNavigation from '../ui/sliderNavigation/SliderNavigation';

import { getApiResources } from '../../service/getApiResources';
import { Context } from '../../context/context';

import style from './credits.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';

const Credits = ({ url, titles, prevClass, nextClass, resultName, actors, fullContainer }) => {
  const [results, setResults] = useState(null);

  const { currentLang } = useContext(Context);

  const type = titles[0].en === 'Movies' ? '/movie' : '/tv';

  useEffect(() => {
    (async() => {
      const res = await getApiResources(url);
      return res && setResults(res);
    })();
  }, [url]);

  return (
    <>
      {results && results[resultName].length > 0 &&
        <div className={style.wrapp}>
          <div className={style.top}>
            <h2>{titles.map(t => t[currentLang])}</h2>
            {results[resultName].length > 5 &&
              <SliderNavigation
                prevClass={prevClass}
                nextClass={nextClass}
              />
            }
          </div>

          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            loop={results[resultName].length > 5 ? true : false}
            breakpoints={ fullContainer
              ? {
                320: {slidesPerView: 2},
                600: {slidesPerView: 4},
                850: {slidesPerView: 6},
                1100: {slidesPerView: 8}
              }
              : {
                320: {slidesPerView: 2},
                420: {slidesPerView: 3},
                550: {slidesPerView: 4},
                700: {slidesPerView: 5}
              }
            }
            navigation={{
              prevEl: `.${prevClass}`,
              nextEl: `.${nextClass}`
            }}
            style={{width: '100%'}}
          >
            {results && results[resultName].map(props => (
              <SwiperSlide key={props.credit_id ? props.credit_id : props.id}>
                {actors 
                  ? <ActorCard {...props} /> 
                  : <VideoCard {...props} type={type} small />
                }
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      }
    </>
  );
}

export default Credits;