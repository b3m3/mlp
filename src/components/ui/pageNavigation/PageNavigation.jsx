import { Link, useParams, useLocation } from 'react-router-dom';

import Button from '../button/Button';

import { changePageLocation, goToPage } from '../../../utils/functions';

import style from './page-navigation.module.scss';

const PageNavigation = ({ totalPages }) => {
  const { pageId } = useParams();
  const { pathname } = useLocation();

  const link_prev = pageId > 3 ? +pageId - 2 : null;
  const link_next = totalPages && pageId < totalPages - 2 ? +pageId + 2 : null;

  return (
    <div className={style.wrapp}>
      <Link to={''}>
        <Button left />
      </Link>

      <ul>
        <li>
          <Link to={''}>1</Link>
        </li>
        <li>...</li>
        <li>
          <Link to={''}>
            {link_prev}
          </Link>
        </li>
        <li>{pageId}</li>
        <li>
          <Link to={''}>
            {link_next}
          </Link>
        </li>
        <li>...</li>
        <li>
          <Link to={''}>
            {totalPages && totalPages}
          </Link>
        </li>
      </ul>

      <Link to={''}
      >
        <Button />
      </Link>
    </div>
  );
}

export default PageNavigation;