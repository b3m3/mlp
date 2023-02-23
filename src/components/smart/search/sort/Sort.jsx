import { useEffect, useMemo, useState } from 'react';

import { API_POPULARITY, API_RELEASE_DATE, API_VOTE_AVERAGE, API_DESC, API_ASC } from '../../../../constants/api';

import { MdKeyboardArrowDown } from 'react-icons/md';
import { BsSortDown } from 'react-icons/bs';

import style from './sort.module.scss';

const optionTitles = [
  {en: 'Relevance', uk: 'Релевантністю', ru: 'Релевантности'},
  {en: 'Popularity', uk: 'Популярними', ru: 'Популярным'},
  {en: 'Not popular', uk: 'Не популярними', ru: 'Не популярным'},
  {en: 'Best rating', uk: 'Кращим рейтингом', ru: 'Лучшему рейтингу'},
  {en: 'Low rating', uk: 'Низьким рейтингом', ru: 'Низкиму рейтингу'},
  {en: 'New', uk: 'Новими', ru: 'Новинкам'},
  {en: 'Old', uk: 'Старими', ru: 'Старым'}
];

const defaultTitle = [
  {en: 'Relevance', uk: 'Релевантністю', ru: 'Релевантности'}
];

const Sort = ({ indexSectionBtn, setSortBy, language }) => {
  const [currentTitle, setCurrentTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const listActive = {padding: '.375rem .75rem', height: '11.25rem'};
  const rotate = {transform: 'rotate(180deg)'};

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
    defaultTitle.map(el => setCurrentTitle(el[language]));
    setSortBy([]);
  }, [language, indexSectionBtn, setSortBy]);

  return (
    <div className={style.wrapp}>
      <div className={style.row}>
        <div 
          className={style.title}
          onClick={() => setIsOpen(a => !a)}
        >
          <BsSortDown />
          <span>{currentTitle}</span>
          <MdKeyboardArrowDown style={isOpen ? rotate : null}/>
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
              {optionTitles[i][language]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sort;