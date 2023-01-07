import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';

import { API_LANGUAGE, API_PAGE } from '../../../constans/api';

import { Context } from '../../../context/context';

import style from './see-all.module.scss';

const SeeAll = ({ title }) => {
  const { pathname } = useLocation();
  const { currentLang } = useContext(Context);
  const { lang, langCode } = currentLang;
  
  return (
    <Link
      to={''}
      className={style.link}
    >
      <span>See all</span>
    </Link>
  );
}

export default SeeAll;