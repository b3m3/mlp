import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';

import { API_POSTER, LANG } from '../../constans/api';
import { textOverflow, getVideoPathname } from '../../utils/functions';
import { Context } from "../../context/context";

import NoPoster from './img/no-poster.webp';

import { AiFillStar } from 'react-icons/ai';

import style from './card.module.scss';

const Card = ({id, poster_path, title, name, vote_average}) => {
  const { pathname } = useLocation();
  const { currentLang } = useContext(Context);
  const { lang } = currentLang;

  const link = `${getVideoPathname(pathname)}${LANG}${lang}/${id}`;

  return (
    <div className={style.card}>
      <div className={style.poster}>
        <Link 
          to={link}
        >
          <img src={poster_path ? API_POSTER+poster_path : NoPoster} alt="Poster" />
        </Link>
      </div>

      {title && <h5>{textOverflow(title, 22)}</h5>}
      {name && <h5>{textOverflow(name, 22)}</h5>}
      
      <div className={style.rating}>
        <AiFillStar />
        <span>{vote_average}</span>
      </div>
    </div>
  );
}

export default Card;