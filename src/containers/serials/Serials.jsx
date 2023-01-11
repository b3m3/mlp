import { useContext } from 'react';

import Preview from '../../components/preview/Preview';
import { SERIALS_POPULAR, SERIALS_TOP_RATED, SERIALS_AIRING_TODAY, SERIALS_ON_THE_AIR, API_LANGUAGE } from '../../constans/api';

import { Context } from '../../context/context';

import style from './serials.module.scss';

const Serials = () => {
  const { currentLang } = useContext(Context);

  const items = [
    {en: 'Popular', uk: 'Популярні', ru: 'Популярные', url: SERIALS_POPULAR+API_LANGUAGE+currentLang},
    {en: 'On the air', uk: 'В ефірі', ru: 'В эфире', url: SERIALS_ON_THE_AIR+API_LANGUAGE+currentLang},
    {en: 'Airing today', uk: 'Сьогодні в ефірі', ru: 'Сегодня в эфире', url: SERIALS_AIRING_TODAY+API_LANGUAGE+currentLang},
    {en: 'Top rated', uk: 'Найкращий рейтинг', ru: 'Лучший рейтинг', url: SERIALS_TOP_RATED+API_LANGUAGE+currentLang}
  ];

  return (
    <section className={style.serials}>
      {items.map((item, i) => (
        <Preview key={i} item={item}/>
      ))}
    </section>
  );
}

export default Serials;