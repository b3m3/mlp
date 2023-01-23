import { Link, useParams, useLocation } from 'react-router-dom';

import Button from '../button/Button';

import { nextPage, prevPage, goToPage } from '../../../utils/functions';

import style from './page-navigation.module.scss';

const PageNavigation = ({ totalPages }) => {
  const { page } = useParams();
  const { pathname } = useLocation();

  const link_prev = page > 3 ? +page - 2 : null;
  const link_next = totalPages && page < totalPages - 2 ? +page + 2 : null;

  return (
    <div className={style.wrapp}>
      <Link to={page > 1 && prevPage(page, pathname)}>
        <Button left />
      </Link>

      <ul>
        <li>
          <Link to={goToPage(page, pathname, 1)}>1</Link>
        </li>
        <li>...</li>
        <li>
          <Link to={goToPage(page, pathname, link_prev)}>
            {link_prev}
          </Link>
        </li>
        <li>{page}</li>
        <li>
          <Link to={goToPage(page, pathname, link_next)}>
            {link_next}
          </Link>
        </li>
        <li>...</li>
        <li>
          <Link to={goToPage(page, pathname, totalPages)}>
            {totalPages && totalPages}
          </Link>
        </li>
      </ul>

      <Link to={page < totalPages && nextPage(page, pathname)}
      >
        <Button />
      </Link>
    </div>
  );
}

export default PageNavigation;