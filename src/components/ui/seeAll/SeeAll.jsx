import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';

import { Context } from '../../../context/context';
import { titleToPathname, getVideoPathname } from '../../../utils/functions';

import style from './see-all.module.scss';

const SeeAll = ({ category }) => {
  const { pathname } = useLocation();
  const { currentLang } = useContext(Context);

  // const buttonNames = [{en: 'See all'}, {ru: 'Смотреть все'}, {ua: 'Переглянути всі'}];

  return (
    <Link
      to={''}
      className={style.link}
    >
      <span >{'see all'}</span>
    </Link>
  );
}

export default SeeAll;