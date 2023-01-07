import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';

import { LANG, PAGE } from '../../../constans/api';

import { Context } from '../../../context/context';
import { titleToPathname, getVideoPathname } from '../../../utils/functions';

import style from './see-all.module.scss';

const SeeAll = ({ category }) => {
  const { pathname } = useLocation();
  const { currentLang } = useContext(Context);
  const { lang } = currentLang;

  const buttonNames = [{en: 'See all'}, {ru: 'Смотреть все'}];

  const link = getVideoPathname(pathname)+LANG+lang+titleToPathname(category)+PAGE+1

  return (
    <Link
      to={link}
      className={style.link}
    >
      {buttonNames.map((name, i) => (
        <span key={i}>{name[lang]}</span> ))}
    </Link>
  );
}

export default SeeAll;