import { Link, useParams, useLocation } from 'react-router-dom';

import Button from '../../ui/button/Button';

import style from './page-navigation.module.scss';
import { useCallback } from 'react';

const PageNavigation = ({ totalPages }) => {
  const { page } = useParams();
  const { pathname } = useLocation();

  const prev = page > 3 ? +page - 2 : null;
  const next = totalPages && page < totalPages - 2 ? +page + 2 : null;

  const onPage = useCallback((prev) => {
    if (pathname.indexOf('/'+page) !== -1)
      return pathname.slice(0, pathname.indexOf('/'+page)) + '/' + (prev ? +page - 1 : +page + 1);
    return;
  }, [pathname, page]);

  const goTo = useCallback((id) => {
    return pathname.slice(0, pathname.indexOf('/'+page)) + '/' + id;
  }, [pathname, page]);

  return (
    <div className={style.wrapp}>
      <Link to={page > 1 && onPage('prev')}>
        <Button left />
      </Link>

      <ul>
        <li>
          <Link to={goTo(1)}>1</Link>
        </li>
        <li>...</li>
        <li>
          <Link to={goTo(prev)}>{prev}</Link>
        </li>
        <li>{page}</li>
        <li>
          <Link to={goTo(next)}>{next}</Link>
        </li>
        <li>...</li>
        <li>
          <Link to={goTo(totalPages)}>{totalPages && totalPages}</Link>
        </li>
      </ul>

      <Link to={page < totalPages && onPage()}><Button /></Link>
    </div>
  );
}

export default PageNavigation;