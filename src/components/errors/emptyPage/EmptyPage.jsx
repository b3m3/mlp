import { useContext } from 'react';

import { Context } from '../../../context/context';
import { emptyPageTitles } from '../../../constans/titles';
import { getTitleLang } from '../../../utils/functions';

import Empty from './img/Empty.webp';

import style from './empty-page.module.scss';

const EmptyPage = () => {
  const { currentLang } = useContext(Context);

  return (
    <div className={style.wrapp}>
      <img src={Empty} alt="Empty" />
      <h4>{getTitleLang(emptyPageTitles, currentLang)}</h4>
    </div>
  );
}

export default EmptyPage;