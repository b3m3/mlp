import { useLocation } from 'react-router-dom';
import { useContext } from 'react';

import { Context } from '../../context/context';
import { notFoundError } from '../../utils/functions';

import Img from './img/notFound.webp';

import style from './not-found.module.scss';

const NotFound = () => {
  const { pathname } = useLocation();
  const { currentLang } = useContext(Context);

  const errors = [
    {en: `The path "${pathname}" is invalid `},
    {uk: `Шлях "${pathname}" вказано невірно`},
    {ru: `Путь "${pathname}" указан неверный`}
  ]

  return (
    <div className={style.not_found}>
      <div className={style.image}>
        <img src={Img} alt="not-found" />
      </div>
      <p>{notFoundError(errors, currentLang)}</p>
    </div>
  );
}

export default NotFound;