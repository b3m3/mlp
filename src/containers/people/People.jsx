import { useContext } from 'react';

import Preview from '../../components/preview/Preview';
import { PEOPLE_POPULAR, API_LANGUAGE } from '../../constans/api';

import { Context } from '../../context/context';

import style from './people.module.scss';

const People = () => {
  const { currentLang } = useContext(Context);

  const items = [
    {en: 'Popular', uk: 'Популярні', ru: 'Популярные', url: PEOPLE_POPULAR+API_LANGUAGE+currentLang},
  ];

  return (
    <section className={style.movies}>
      {items.map((item, i) => (
        <Preview key={i} item={item}/>
      ))}
    </section>
  );
}

export default People;