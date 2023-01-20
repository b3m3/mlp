import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import Card from '../../card/Card';
import SliderNavigation from '../../ui/sliderNavigation/SliderNavigation';

import { API_ROOT, API_KEY, API_RECOMMEND, API_LANGUAGE } from '../../../constans/api';
import { getApiResources } from '../../../service/getApiResources';
import { Context } from '../../../context/context';

import style from './recommendations.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';

const Recommendations = () => {
  const [results, setResults] = useState(null);

  const { mediaType, videoId } = useParams();
  const { currentLang } = useContext(Context);

  const titles = [{en: 'Recommendations'},{ru: 'Рекомендации'},{uk: 'Рекомендації'}];

  const url = `${API_ROOT}/${mediaType}/${videoId}${API_RECOMMEND}${API_KEY}${API_LANGUAGE}${currentLang}`;

  useEffect(() => {
    (async() => {
      const res = await getApiResources(url);
      return res && setResults(res);
    })();
  }, [url]);

  return (
    <>
      {results && results.results.length > 0 &&
        <div className={style.wrapp}>

          <div className={style.top}>
            <h2>{titles.map(t => t[currentLang])}</h2>
            <SliderNavigation
              prevClass={'rec-prev'}
              nextClass={'rec-next'}
            />
          </div>

          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={5}
            loop={true}
            navigation={{
              prevEl: ".rec-prev",
              nextEl: ".rec-next"
            }}
            style={{width: '100%'}}
          >
            {results && results.results.map(props => (
              <SwiperSlide key={props.id} style={{width: '12.375rem'}}>
                <Card {...props} small />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      }
    </>
  );
}

export default Recommendations;