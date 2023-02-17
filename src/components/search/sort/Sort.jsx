import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { sortTitles, sortDefaultTitle, sortOptionsTitles } from '../../../constans/titles';
import { getTitleLang } from '../../../utils/functions';
import { API_POPULARITY, API_RELEASE_DATE, API_VOTE_AVERAGE, API_DESC, API_ASC } from '../../../constans/api';

import { MdKeyboardArrowDown } from 'react-icons/md';

import style from './sort.module.scss';

const Sort = ({ indexSectionBtn, setSortBy }) => {
  const [currentTitle, setCurrentTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const language = useSelector(state => state.language.language);

  const listActive = {padding: '.375rem .75rem', height: '11.25rem'};

  const optionsPath = useMemo(() => [
    {path: ''},
    {path: API_POPULARITY+API_DESC},
    {path: API_POPULARITY+API_ASC},
    {path: API_VOTE_AVERAGE+API_DESC},
    {path: API_VOTE_AVERAGE+API_ASC},
    {path: API_RELEASE_DATE+API_DESC},
    {path: API_RELEASE_DATE+API_ASC}
  ], []);

  useEffect(() => {
    sortDefaultTitle.map(el => setCurrentTitle(el[language]));
    setSortBy([]);
  }, [language, indexSectionBtn, setSortBy]);

  return (
    <div className={style.wrapp}>
      <p>{getTitleLang(sortTitles, language)}</p>

      <div className={style.row}>
        <div 
          className={style.title}
          onClick={() => setIsOpen(a => !a)}
        >
          <span>{currentTitle}</span>
          <span style={isOpen ? {transform: 'rotate(180deg)'} : null}>
            <MdKeyboardArrowDown />
          </span>
        </div>

        <ul 
          className={style.list}
          style={isOpen ? listActive : null}
        >
          {optionsPath.map((el, i) => (
            <li
              key={i}
              id={el.path}
              onClick={(e) => {
                setCurrentTitle(e.target.textContent);
                setSortBy(el.path);
                setIsOpen(false);
              }}
            >
              {sortOptionsTitles[i][language]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sort;