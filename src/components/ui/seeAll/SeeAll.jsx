import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';

import { Context } from '../../../context/context';
import { titleToPathname, getTypeFromLocation } from '../../../utils/functions';

import { MdCallMade } from 'react-icons/md'

import style from './see-all.module.scss';

const SeeAll = ({ category }) => {
  const { pathname } = useLocation();
  const { currentLang } = useContext(Context);

  const link = `/${currentLang}${getTypeFromLocation(pathname)}${titleToPathname(category)}/1`;

  return (
    <Link
      to={link}
      className={style.link}
    >
      <MdCallMade />
    </Link>
  );
}

export default SeeAll;