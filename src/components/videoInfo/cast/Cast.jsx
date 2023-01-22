import { useState, useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import PeopleItem from '../../peopleItem/PeopleItem';
import SliderNavigation from '../../ui/sliderNavigation/SliderNavigation';

import { API_ROOT, API_KEY, API_LANGUAGE, API_CREDITS } from '../../../constans/api';

import { getApiResources } from '../../../service/getApiResources';
import { getVideoFromLocation } from '../../../utils/functions';
import { Context } from '../../../context/context';

import style from './cast.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';

const Cast = () => {
  const [results, setResults] = useState(null);

  const { currentLang } = useContext(Context);
  const { pathname } = useLocation();
  const { videoId } = useParams();

  const titles = [{en: 'Cast'},{ru: 'В ролях'},{uk: 'Акторський склад'}];

  const url = 
    `${API_ROOT}${getVideoFromLocation(pathname)}/${videoId}${API_CREDITS}${API_KEY}${API_LANGUAGE}${currentLang}`;

  useEffect(() => {
    (async() => {
      const res = await getApiResources(url);
      return res ? setResults(res) : null;
    })();
  }, [url]);

  return (
    <>
      {results && results.cast.length > 0 &&
        <div className={style.wrapp}>
          <div className={style.top}>
            <h2>{titles.map(t => t[currentLang])}</h2>
            <SliderNavigation
              prevClass={'cas-prev'}
              nextClass={'cas-next'}
            />
          </div>

          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            loop={true}
            speed={400}
            breakpoints={{
              320: {slidesPerView: 2},
              420: {slidesPerView: 3},
              550: {slidesPerView: 4},
              700: {slidesPerView: 5}
            }}
            navigation={{
              prevEl: ".cas-prev",
              nextEl: ".cas-next"
            }}
            style={{width: '100%'}}
          >
            {results.cast.map(props => (
              <SwiperSlide key={props.id} style={{width: '12.375rem'}}>
                <PeopleItem
                  key={props.id}
                  {...props}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      }
    </>
  );
}

export default Cast;