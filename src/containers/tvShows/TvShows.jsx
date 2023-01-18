import { useContext } from 'react';

import Preview from '../../components/preview/Preview';
import { TV_SHOWS_POPULAR, TV_SHOWS_TOP_RATED, TV_SHOWS_AIRING_TODAY, TV_SHOWS_ON_THE_AIR, API_LANGUAGE } from '../../constans/api';

import { Context } from '../../context/context';

import style from './tv-shows.module.scss';

const TvShows = () => {
  const { currentLang } = useContext(Context);

  const items = [
    {en: 'Popular', uk: 'Популярні', ru: 'Популярные', url: TV_SHOWS_POPULAR+API_LANGUAGE+currentLang},
    {en: 'On the air', uk: 'В ефірі', ru: 'В эфире', url: TV_SHOWS_ON_THE_AIR+API_LANGUAGE+currentLang},
    {en: 'Airing today', uk: 'Сьогодні в ефірі', ru: 'Сегодня в эфире', url: TV_SHOWS_AIRING_TODAY+API_LANGUAGE+currentLang},
    {en: 'Top rated', uk: 'Найкращий рейтинг', ru: 'Лучший рейтинг', url: TV_SHOWS_TOP_RATED+API_LANGUAGE+currentLang}
  ];

  return (
    <section className={style.wrapp}>
      {items.map((item, i) => (
        <Preview key={i} item={item}/>
      ))}
    </section>
  );
}

export default TvShows;