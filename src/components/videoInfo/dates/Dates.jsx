import { useContext } from 'react';

import { getYearFromDate } from '../../../utils/functions';
import { Context } from '../../../context/context';

import { AiFillCalendar } from 'react-icons/ai';

import style from './dates.module.scss';

const Dates = ({ release, first, last, status, fullDate }) => {
  const { currentLang } = useContext(Context);

  const endeds = [{ru: 'Серии выпускаются'}, {uk: 'Серії випускаються'}, {en: 'Returning series'}];
  const canceleds = [{ru: 'Отмененный'}, {uk: 'Скасований'}, {en: 'Canceled'}];

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
          {last && status === "Ended" && ` - ${getYearFromDate(last)}`}
          {last && status === "Returning Series" && ` - ${translate(endeds, currentLang)}`}
          {last && status === "Canceled" && ` - ${translate(canceleds, currentLang)}`}
        </h4>
      }
    </div>
  );
}

export default Dates;