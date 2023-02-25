import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { API_SEASON, API_TV_SHOWS } from '../../../constants/api';
import { getTitleLang } from '../../../utils/functions';

import { MdPlayArrow } from 'react-icons/md';

import style from './tv-seasons-button.module.scss';

const titles = [
  {en: 'Seasons', uk: 'Сезони', ru: 'Сезоны'}
]

const TvSeasonsButton = ({id}) => {
  const language = useSelector(state => state.language.language);
  const title = getTitleLang(titles, language);

  const link = '/'+language+API_TV_SHOWS+'/'+id+API_SEASON+'/'+1;

  return (
    <Link 
      className={style.btn}
      to={link}
    >
      <span>{title}</span>
      <MdPlayArrow />
    </Link>
  );
}

export default TvSeasonsButton;