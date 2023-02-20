import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import Preview from '../../containers/preview/Preview';
import { ACTORS_POPULAR, API_LANGUAGE } from '../../constants/api';

import style from './actors.module.scss';

const Actors = () => {
  const language = useSelector(state => state.language.language);

  const items = useMemo(() => [
    {en: 'Popular', uk: 'Популярні', ru: 'Популярные', url: ACTORS_POPULAR+API_LANGUAGE+language},
  ], [language]);

  return (
    <section className={style.wrapp}>
      {items.map((item, i) => (
        <Preview key={i} item={item} actors />
      ))}
    </section>
  );
}

export default Actors;

