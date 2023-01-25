import { useContext } from 'react';

import Preview from '../../components/preview/Preview';
import ActorsPreview from '../../components/actorsPreview/ActorsPreview';
import { ACTORS_POPULAR, API_LANGUAGE } from '../../constans/api';
import { Context } from '../../context/context';

import style from './actors.module.scss';

const Actors = () => {
  const { currentLang } = useContext(Context);

  const items = [
    {en: 'Popular', uk: 'Популярні', ru: 'Популярные', url: ACTORS_POPULAR+API_LANGUAGE+currentLang},
  ];

  return (
    <section className={style.wrapp}>
      {items.map((item, i) => (
        <ActorsPreview key={i} item={item} />
      ))}
    </section>
  );
}

export default Actors;

