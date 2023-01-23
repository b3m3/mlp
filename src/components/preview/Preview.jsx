import { useState, useEffect, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import Card from '../card/Card';
import PeopleItem from '../peopleItem/PeopleItem';
import SeeAll from '../ui/seeAll/SeeAll';
import Shimmer from '../ui/shimmer/Shimmer';

import { getApiResults } from '../../service/getApiResources';
import { Context } from '../../context/context';

import style from './preview.module.scss';
import 'swiper/css';

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
            spaceBetween={15}
            slidesPerView={'auto'}
            speed={800}
          >
            {results &&
              results.results.map(props => (
                <SwiperSlide key={props.id} className={style.slide} >
                  {actors ? <PeopleItem {...props} /> : <Card {...props}  />}
                </SwiperSlide>
              ))
            }
          </Swiper>
      }
    </div>
  );
}

export default Preview;