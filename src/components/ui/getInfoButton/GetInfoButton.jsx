import { Link, useParams } from 'react-router-dom';

import style from './get-info.module.scss';

const GetInfoButton = ({ id, type }) => {
  const { lang } = useParams();

  const link = `/${lang}${type}/${id}`;
  
  return (
    <Link 
      to={link}
      className={style.button}
    >
      Get info
    </Link>
  );
}

export default GetInfoButton;