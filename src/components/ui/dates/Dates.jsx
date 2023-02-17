import { useSelector } from 'react-redux';

import { getYearFromDate } from '../../../utils/functions';

import { AiFillCalendar } from 'react-icons/ai';

import style from './dates.module.scss';

const Dates = ({ release, first, last, birthday, deathday, status, fullDate }) => {
  const language = useSelector(state => state.language.language);

  const endeds = [{ru: 'Серии выпускаются', uk: 'Серії випускаються', en: 'Returning series'}];
  const canceleds = [{ru: 'Отмененный', uk: 'Скасований', en: 'Canceled'}];

  const translate = (arr, lang) => {
    return arr.map(s => s[lang]).join('')
  };

  return (    
    <div className={style.wrapp}>
      <AiFillCalendar />
      {fullDate
        ? <h4>{fullDate && fullDate.split('T').shift().split('-').join('/')}</h4>
        : <h4>
          {release && getYearFromDate(release)}
          {first && getYearFromDate(first)}
          {birthday && birthday.split('-').join('.')}
          {deathday && deathday && ` - ${deathday.split('-').join('.')}`}
          {last && status === "Ended" && ` - ${getYearFromDate(last)}`}
          {last && status === "Returning Series" && ` - ${translate(endeds, language)}`}
          {last && status === "Canceled" && ` - ${translate(canceleds, language)}`}
        </h4>
      }
    </div>
  );
}

export default Dates;