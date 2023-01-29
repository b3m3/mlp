import { useContext } from 'react';

import { Context } from '../../context/context';
import Trending from '../../components/trending/Trending';

import { API_ROOT, API_MOVIE, API_TV_SHOWS, API_ACTORS, API_KEY, API_DAY, API_TRENDING, API_LANGUAGE } from '../../constans/api';

import style from './home.module.scss';

const Home = () => {
  const { currentLang } = useContext(Context);

  const itemsVideo = [
    {
      en: 'Trending мovies',
      uk: 'Фільми у тренді',
      ru: 'Фильмы в тренде',
      url: API_ROOT+API_TRENDING+API_MOVIE+API_DAY+API_KEY+API_LANGUAGE+currentLang,
      type: API_MOVIE
    },
    {
      en: 'Trending TV Shows',
      uk: 'Серіали у тренді',
      ru: 'Сериалы в тренде',
      url: API_ROOT+API_TRENDING+API_TV_SHOWS+API_DAY+API_KEY+API_LANGUAGE+currentLang,
      type: API_TV_SHOWS
    }
  ];

  const itemActors = [
    {
      en: 'Trending Actors',
      uk: 'Актори у тренді',
      ru: 'Актеры в тренде',
      url: API_ROOT+API_TRENDING+API_ACTORS+API_DAY+API_KEY+API_LANGUAGE+currentLang,
      type: API_ACTORS
    }
  ];

  return (
    <section className={style.wrapp}>
      {itemsVideo.map((item, i) => <Trending key={i} item={item} />)}
      <Trending item={itemActors[0]} actors />
    </section>
  );
}

export default Home;