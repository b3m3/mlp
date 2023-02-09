import { useContext, useEffect, useState } from 'react';

import { sortTitles, sortDefaultTitle, sortOptionsTitles } from '../../../constans/titles';
import { Context } from '../../../context/context';
import { getTitleLang } from '../../../utils/functions';
import { API_POPULARITY, API_RELEASE_DATE, API_VOTE_AVERAGE, API_DESC, API_ASC } from '../../../constans/api';

import { MdKeyboardArrowDown } from 'react-icons/md';

import style from './sort.module.scss';

const Sort = ({ indexSectionBtn, setSortBy }) => {
  const [currentTitle, setCurrentTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { currentLang } = useContext(Context);

  const listActive = {padding: '.375rem .75rem', height: '11.25rem'};

  const optionsPath = [
    {path: ''},
    {path: API_POPULARITY+API_DESC},
    {path: API_POPULARITY+API_ASC},
    {path: API_VOTE_AVERAGE+API_DESC},
    {path: API_VOTE_AVERAGE+API_ASC},
    {path: API_RELEASE_DATE+API_DESC},
    {path: API_RELEASE_DATE+API_ASC}
  ];

  useEffect(() => {
    sortDefaultTitle.map(el => setCurrentTitle(el[currentLang]));
    setSortBy([]);
  }, [currentLang, indexSectionBtn, setSortBy]);

  return (
    <div className={style.wrapp}>
      <p>{getTitleLang(sortTitles, currentLang)}</p>

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
              {sortOptionsTitles[i][currentLang]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sort;