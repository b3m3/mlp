import { useContext } from 'react';

import Preview from '../../components/preview/Preview';
import { MOVIES_POPULAR, MOVIES_TOP_RATED, MOVIES_NOW_PLAYING, MOVIES_UPCOMING, API_LANGUAGE } from '../../constans/api';

import { Context } from '../../context/context';

import style from './movies.module.scss';

const Movies = () => { 
  const { currentLang } = useContext(Context);
  const { langCode } = currentLang;

  const items = [
    {en: 'Popular', ru: 'Популярные', url: MOVIES_POPULAR+API_LANGUAGE+langCode},
    {en: 'Now playing', ru: 'Сейчас в прокате', url: MOVIES_NOW_PLAYING+API_LANGUAGE+langCode},
    {en: 'Upcoming', ru: 'Предстоящие', url: MOVIES_UPCOMING+API_LANGUAGE+langCode},
    {en: 'Top rated', ru: 'Лучший рейтинг', url: MOVIES_TOP_RATED+API_LANGUAGE+langCode}
  ];

  return (
    <section className={style.movies}>
      {items.map((item, i) => (
        <Preview key={i} item={item}/>
      ))}
    </section>
  );
}

export default Movies;