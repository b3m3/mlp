import { useLocation } from 'react-router-dom';
import { useContext } from 'react';

import { Context } from '../../context/context';
import { notFoundError } from '../../utils/functions';

import Img from './img/notFound.webp';

import style from './not-found.module.scss';

const NotFound = () => {
  const { pathname } = useLocation();
  const { currentLang } = useContext(Context);
  const { lang } = currentLang;

  const errors = [
    {en: `No results found for "${pathname}"`},
    {uk: `За запитом "${pathname}" нічого не знайдено`},
    {ru: `По запросу "${pathname}" ничего не найдено`}
  ]

  return (
    <div className={style.not_found}>
      <div className={style.image}>
        <img src={Img} alt="not-found" />
      </div>
      <p>{notFoundError(errors, lang)}</p>
    </div>
  );
}

export default NotFound;