import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getTypeFromLocation } from '../../../utils/functions';

import { MdCallMade } from 'react-icons/md'

import style from './see-all.module.scss';
import { useMemo } from 'react';

const SeeAll = ({ category }) => {
  const { pathname } = useLocation();
  const language = useSelector(state => state.language.language);

  const getType = useMemo(() => {
    return '/' + category.toLowerCase().split(' ').join('_');
  }, [category]);

  const link = `/${language}${getTypeFromLocation(pathname)}${getType}/1`;

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