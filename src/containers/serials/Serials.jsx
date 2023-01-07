import { useContext } from 'react';

import Preview from '../../components/preview/Preview';
import { SERIALS_POPULAR, SERIALS_TOP_RATED, SERIALS_AIRING_TODAY, SERIALS_ON_THE_AIR, API_LANGUAGE } from '../../constans/api';

import { Context } from '../../context/context';

import style from './serials.module.scss';

const Serials = () => {
  const { currentLang } = useContext(Context);
  const { langCode } = currentLang;

  const items = [
    {en: 'Popular', ru: 'Популярные', url: SERIALS_POPULAR+API_LANGUAGE+langCode},
    {en: 'On the air', ru: 'В эфире', url: SERIALS_ON_THE_AIR+API_LANGUAGE+langCode},
    {en: 'Airing today', ru: 'Сегодня в эфире', url: SERIALS_AIRING_TODAY+API_LANGUAGE+langCode},
    {en: 'Top rated', ru: 'Лучший рейтинг', url: SERIALS_TOP_RATED+API_LANGUAGE+langCode}
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