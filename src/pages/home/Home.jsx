import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import Trending from '../../containers/trending/Trending';

import { API_ROOT, API_MOVIE, API_TV_SHOWS, API_ACTORS, API_KEY, API_DAY, API_TRENDING, API_LANGUAGE } from '../../constants/api';
import { setDocumentTitle, getTitleLang } from '../../utils/functions';

import style from './home.module.scss';

const documetTitles = [
  {
    en: 'Search movies, tv shows, actors',
    uk: 'Пошук фільмів, серіалів, акторів', 
    ru: 'Поиск фильмов, сериалов, актеров'
  }
];

const Home = () => {
  const language = useSelector(state => state.language.language);

  const itemsVideo = useMemo(() => [
    {
      en: 'Trending мovies',
      uk: 'Фільми у тренді',
      ru: 'Фильмы в тренде',
      url: API_ROOT+API_TRENDING+API_MOVIE+API_DAY+API_KEY+API_LANGUAGE+language,
      type: API_MOVIE
    },
    {
      en: 'Trending TV Shows',
      uk: 'Серіали у тренді',
      ru: 'Сериалы в тренде',
      url: API_ROOT+API_TRENDING+API_TV_SHOWS+API_DAY+API_KEY+API_LANGUAGE+language,
      type: API_TV_SHOWS
    }
  ], [language]);

  const itemActors = useMemo(() => [
    {
      en: 'Trending Actors',
      uk: 'Актори у тренді',
      ru: 'Актеры в тренде',
      url: API_ROOT+API_TRENDING+API_ACTORS+API_DAY+API_KEY+API_LANGUAGE+language,
      type: API_ACTORS
    }
  ], [language]);

  useEffect(() => {
    setDocumentTitle(getTitleLang(documetTitles, language))
  }, [language]);

  return (
    <section className={style.wrapp}>
      {itemsVideo.map((item, i) => <Trending key={i} item={item} />)}
      <Trending item={itemActors[0]} actors />
    </section>
  );
}

export default Home;