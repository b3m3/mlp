import { Link, useLocation, useParams } from 'react-router-dom';
import { useContext } from 'react';

import { Context } from '../../../context/context';
import { titleToPathname, getVideoFromLocation } from '../../../utils/functions';

import style from './see-all.module.scss';

const SeeAll = ({ category }) => {
  const { pathname } = useLocation();
  const { currentLang } = useContext(Context);

  const link = `/${currentLang}${getVideoFromLocation(pathname)}${titleToPathname(category)}/1`;

  return (
    <Link
      to={link}
      className={style.link}
    >
      <span >{'see all'}</span>
    </Link>
  );
}

export default SeeAll;