import { Link } from 'react-router-dom';

import Poster from '../ui/poster/Poster';

import style from './people-item.module.scss';

const PeopleItem = ({ id, name, profile_path }) => {
  return (
    <div className={style.wrapp}>
      <Link >
        <Poster path={profile_path} />
      </Link>

      <h4>{name}</h4>
    </div>
  );
}

export default PeopleItem;