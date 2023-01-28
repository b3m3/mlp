import { Link, useParams } from 'react-router-dom';

import style from './get-info-btn.module.scss';

const GetInfoBtn = ({ id, type }) => {
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

export default GetInfoBtn;