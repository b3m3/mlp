import { useSelector } from 'react-redux';

import { getTitleLang } from '../../../../utils/functions';

import Empty from './img/Empty.webp';

import style from './empty-page.module.scss';

const titles = [
  {en: 'List is empty', uk: 'Список порожній', ru: 'Список пуст'}
];

const EmptyPage = () => {
  const language = useSelector(state => state.language.language);

  const title = getTitleLang(titles, language);

  return (
    <div className={style.wrapp}>
      <img src={Empty} alt="Empty" />
      <h4>{title}</h4>
    </div>
  );
}

export default EmptyPage;