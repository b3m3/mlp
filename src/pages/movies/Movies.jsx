import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import Preview from '../../containers/preview/Preview';
import { MOVIES_POPULAR, MOVIES_TOP_RATED, MOVIES_NOW_PLAYING, MOVIES_UPCOMING, API_LANGUAGE } from '../../constants/api';

import style from './movies.module.scss';

const Movies = () => { 
  const language = useSelector(state => state.language.language);

  const items = useMemo(() => [
    {en: 'Popular', uk: 'Популярні', ru: 'Популярные', url: MOVIES_POPULAR+API_LANGUAGE+language},
    {en: 'Now playing', uk: 'Зараз у прокаті', ru: 'Сейчас в прокате', url: MOVIES_NOW_PLAYING+API_LANGUAGE+language},
    // {en: 'Upcoming', uk: 'Майбутні', ru: 'Предстоящие', url: MOVIES_UPCOMING+API_LANGUAGE+language},
    {en: 'Top rated', uk: 'Найкращий рейтинг', ru: 'Лучший рейтинг', url: MOVIES_TOP_RATED+API_LANGUAGE+language}
  ], [language]);

  return (
    <section className={style.movies}>
      {items.map((item, i) => (
        <Preview key={i} item={item}/>
      ))}
    </section>
  );
}

export default Movies;