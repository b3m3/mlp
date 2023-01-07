import { useContext } from 'react';

import Preview from '../../components/preview/Preview';
import { SERIALS_POPULAR, SERIALS_TOP_RATED, SERIALS_AIRING_TODAY, SERIALS_ON_THE_AIR, API_LANGUAGE } from '../../constans/api';

import { Context } from '../../context/context';

import style from './serials.module.scss';

const Serials = () => {
  const { currentLang } = useContext(Context);
  const { langCode } = currentLang;

  const items = [
    {EN: 'Popular', RU: 'Популярные', url: SERIALS_POPULAR+API_LANGUAGE+langCode},
    {EN: 'On the air', RU: 'В эфире', url: SERIALS_ON_THE_AIR+API_LANGUAGE+langCode},
    {EN: 'Airing today', RU: 'Сегодня в эфире', url: SERIALS_AIRING_TODAY+API_LANGUAGE+langCode},
    {EN: 'Top rated', RU: 'Лучший рейтинг', url: SERIALS_TOP_RATED+API_LANGUAGE+langCode}
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