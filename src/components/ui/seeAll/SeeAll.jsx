import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { titleToPathname, getTypeFromLocation } from '../../../utils/functions';

import { MdCallMade } from 'react-icons/md'

import style from './see-all.module.scss';

const SeeAll = ({ category }) => {
  const { pathname } = useLocation();
  const language = useSelector(state => state.language.language);

  const link = `/${language}${getTypeFromLocation(pathname)}${titleToPathname(category)}/1`;

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