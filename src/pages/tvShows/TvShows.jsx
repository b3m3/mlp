import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import Preview from '../../containers/preview/Preview';
import { TV_SHOWS_POPULAR, TV_SHOWS_TOP_RATED, TV_SHOWS_ON_THE_AIR, API_LANGUAGE } from '../../constants/api';

import style from './tv-shows.module.scss';

const TvShows = () => {
  const language = useSelector(state => state.language.language);

  const items = useMemo(() => [
    {en: 'Popular', uk: 'Популярні', ru: 'Популярные', url: TV_SHOWS_POPULAR+API_LANGUAGE+language},
    {en: 'On the air', uk: 'В ефірі', ru: 'В эфире', url: TV_SHOWS_ON_THE_AIR+API_LANGUAGE+language},
    {en: 'Top rated', uk: 'Найкращий рейтинг', ru: 'Лучший рейтинг', url: TV_SHOWS_TOP_RATED+API_LANGUAGE+language}
  ], [language]);

  return (
    <section className={style.wrapp}>
      {items.map((item, i) => (
        <Preview key={i} item={item}/>
      ))}
    </section>
  );
}

export default TvShows;