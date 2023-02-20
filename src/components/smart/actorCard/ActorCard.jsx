import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Poster from '../../ui/poster/Poster';

import style from './actor-card.module.scss';

const ActorCard = ({ id, name, character, profile_path, onHover }) => {
  const language = useSelector(state => state.language.language);

  const link = `/${language}/person/${id}`;

  return (
    <div className={style.wrapp}>
      <Link 
        to={link}
        className={onHover && style.onhover}
      >
        <Poster path={profile_path} />
      </Link>

      <div>
        <h4>{name && name}</h4>
        <span>{character && character}</span>
      </div>
    </div>
  );
}

export default ActorCard;