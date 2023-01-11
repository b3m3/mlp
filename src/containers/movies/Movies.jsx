import { useContext } from 'react';

import Preview from '../../components/preview/Preview';
import { MOVIES_POPULAR, MOVIES_TOP_RATED, MOVIES_NOW_PLAYING, MOVIES_UPCOMING, API_LANGUAGE } from '../../constans/api';

import { Context } from '../../context/context';

import style from './movies.module.scss';

const Movies = () => { 
  const { currentLang } = useContext(Context);

  const items = [
    {en: 'Popular', uk: 'Популярні', ru: 'Популярные', url: MOVIES_POPULAR+API_LANGUAGE+currentLang},
    {en: 'Now playing', uk: 'Зараз у прокаті', ru: 'Сейчас в прокате', url: MOVIES_NOW_PLAYING+API_LANGUAGE+currentLang},
    {en: 'Upcoming', uk: 'Майбутні', ru: 'Предстоящие', url: MOVIES_UPCOMING+API_LANGUAGE+currentLang},
    {en: 'Top rated', uk: 'Найкращий рейтинг', ru: 'Лучший рейтинг', url: MOVIES_TOP_RATED+API_LANGUAGE+currentLang}
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