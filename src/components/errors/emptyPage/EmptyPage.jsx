import { useContext } from 'react';

import { Context } from '../../../context/context';

import Empty from './img/Empty.webp';

import style from './empty-page.module.scss';

const EmptyPage = () => {
  const { currentLang } = useContext(Context);

  const titles = [
    {en: 'Favorites list is empty'}, 
    {uk: 'Список обраного порожній'}, 
    {ru: 'Список избранного пуст'}
  ]

  return (
    <div className={style.wrapp}>
      <img src={Empty} alt="Empty" />
      <h4>{titles.map(t => t[currentLang])}</h4>
    </div>
  );
}

export default EmptyPage;