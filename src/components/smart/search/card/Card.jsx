import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Poster from '../../../ui/poster/Poster';

import style from './card.module.scss';

const Card = ({id, poster_path, type}) => {
  const language = useSelector(state => state.language.language);

  const link = `/${language}${type}/${id}`;

  return (
    <div className={style.wrapp}>
      <Link to={link}>
        <Poster path={poster_path} />
      </Link>
    </div>
  );
}

export default Card;