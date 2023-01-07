import { Link, useLocation } from 'react-router-dom';

import { titleToLocation } from '../../../utils/functions';
import { API_LANGUAGE, API_PAGE, API_EN } from '../../../constans/api';

import style from './see-all.module.scss';

const SeeAll = ({ title }) => {
  const { pathname } = useLocation();

  const path = `${pathname}${titleToLocation(title)}${API_LANGUAGE}${API_EN}${API_PAGE}1`;
  
  return (
    <Link
      to={path}
      className={style.link}
    >
      <span>See all</span>
    </Link>
  );
}

export default SeeAll;