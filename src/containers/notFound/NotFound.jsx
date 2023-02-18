import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Img from './img/notFound.webp';

import style from './not-found.module.scss';
import { useMemo } from 'react';

const NotFound = () => {
  const { pathname } = useLocation();
  const language = useSelector(state => state.language.language);

  const errors = useMemo(() => [
    {en: `The path "${pathname}" is invalid `},
    {uk: `Шлях "${pathname}" вказано невірно`},
    {ru: `Путь "${pathname}" указан неверный`}
  ], [pathname]);

  const translateError = useMemo(() => {
    return errors.map(el => el[language]);
  }, [language, errors]);

  return (
    <div className={style.not_found}>
      <div className={style.image}>
        <img src={Img} alt="not-found" />
      </div>
      <p>{translateError}</p>
    </div>
  );
}

export default NotFound;