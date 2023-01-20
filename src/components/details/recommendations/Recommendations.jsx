import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import Card from '../../card/Card';
import { API_ROOT, API_KEY, API_RECOMMEND, API_LANGUAGE } from '../../../constans/api';
import { getApiResults } from '../../../service/getApiResources';
import { Context } from '../../../context/context';

import style from './recommendations.module.scss';
import 'swiper/css';

const Recommendations = () => {
  const [results, setResults] = useState(null);
  const [errorApi, setErrorApi] = useState(false);

  const { currentLang } = useContext(Context);
  const { mediaType, videoId } = useParams();

  const url = `${API_ROOT}/${mediaType}/${videoId}${API_RECOMMEND}${API_KEY}${API_LANGUAGE}${currentLang}`;

  useEffect(() => {
    getApiResults(url, setResults, setErrorApi);
  }, [url]);

  return (
    <div className={style.wrapp}>
      <Swiper
        spaceBetween={15}
        // slidesPerView={'auto'}
        loop={true}
      >
        {results && results.results.map(props => (
          <SwiperSlide key={props.id} style={{width: '12.375rem'}}>
            <Card {...props} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Recommendations;