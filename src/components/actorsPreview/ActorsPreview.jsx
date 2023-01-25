import { useState, useEffect, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import VideoCard from '../videoCard/VideoCard';
import ActorCard from '../actorCard/ActorCard';
import SeeAll from '../ui/seeAll/SeeAll';
import Shimmer from '../ui/shimmer/Shimmer';

import { getApiResults } from '../../service/getApiResources';
import { Context } from '../../context/context';

import style from './actors-preview.module.scss';
import 'swiper/css';

const ActorsPreview = ({ item }) => {
  const [results, setResults] = useState(null);
  const [errorApi, setErrorApi] = useState(false);

  const { currentLang } = useContext(Context);

  useEffect(() => {
    getApiResults(item.url, setResults, setErrorApi);
  }, [item.url]);

  return (
    <div className={style.wrapp}>
      <div className={style.top}>
        <h2>{item[currentLang]}</h2>
        <SeeAll category={item.en}/>
      </div>
      
      {errorApi
        ? <h2>Error</h2>
        : <ul className={style.list}>
            {results && results.results.slice(0, 18).map(props => (
              <li key={props.id}>
                <ActorCard {...props} />
              </li>
            ))}
          </ul>
      }
    </div>
  );
}

export default ActorsPreview;