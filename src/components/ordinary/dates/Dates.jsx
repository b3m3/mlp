import { useSelector } from 'react-redux';

import { AiFillCalendar } from 'react-icons/ai';

import style from './dates.module.scss';
import { useCallback, useMemo } from 'react';

const endeds = [
  {ru: 'Серии выпускаются', uk: 'Серії випускаються', en: 'Returning series'}
];

const canceleds = [
  {ru: 'Отмененный', uk: 'Скасований', en: 'Canceled'}
];

const Dates = ({ release, first, last, birthday, deathday, status, fullDate }) => {
  const language = useSelector(state => state.language.language);

  const translate = useCallback((arr, lang) => {
    return arr.map(s => s[lang]).join('');
  }, []);

  const getYear = useCallback((date) => {
    return date.split('-')[0];
  }, []);

  const body = useMemo(() => {
    return (
      fullDate
        ? <h4>{fullDate && fullDate.split('T').shift().split('-').join('/')}</h4>
        : <h4>
          {release && getYear(release)}
          {first && getYear(first)}
          {birthday && birthday.split('-').join('.')}
          {deathday && deathday && ` - ${deathday.split('-').join('.')}`}
          {last && status === "Ended" && ` - ${getYear(last)}`}
          {last && status === "Returning Series" && ` - ${translate(endeds, language)}`}
          {last && status === "Canceled" && ` - ${translate(canceleds, language)}`}
        </h4>
    )
  }, [getYear, translate, language, release, first, last, birthday, deathday, status, fullDate]);

  return (    
    <div className={style.wrapp}>
      <AiFillCalendar />
      { body }
    </div>
  );
}

export default Dates;