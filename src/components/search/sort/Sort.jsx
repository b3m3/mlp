import { useContext, useEffect, useState } from 'react';

import { Context } from '../../../context/context';
import { API_POPULARITY, API_RELEASE_DATE, API_VOTE_AVERAGE, API_DESC, API_ASC } from '../../../constans/api';

import { MdKeyboardArrowDown } from 'react-icons/md';

import style from './sort.module.scss';

const Sort = ({ indexSectionBtn, setSortBy }) => {
  const [currentTitle, setCurrentTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { currentLang } = useContext(Context);

  const listActive = {padding: '.375rem .75rem', height: '11.25rem'};

  const sortTitles = [{en: 'Sort by:'}, {uk: 'Сортувати за:'}, {ru: 'Сортировать по:'}];
  const defaultTitle = [{en: 'Relevance', uk: 'Релевантністю', ru: 'Релевантности'}];
  const options = [
    {
      path: [],
      name: [{en: 'Relevance', uk: 'Релевантністю', ru: 'Релевантности'}]
    },
    {
      path: API_POPULARITY+API_DESC,
      name: [{en: 'Popularity', uk: 'Популярними', ru: 'Популярным'}]
    },
    {
      path: API_POPULARITY+API_ASC,
      name: [{en: 'Not popular', uk: 'Не популярними', ru: 'Не популярным'}]
    },
    {
      path: API_VOTE_AVERAGE+API_DESC,
      name: [{en: 'Best rating', uk: 'Кращим рейтингом', ru: 'Лучшему рейтингу'}]
    },
    {
      path: API_VOTE_AVERAGE+API_ASC,
      name: [{en: 'Low rating', uk: 'Низьким рейтингом', ru: 'Низкиму рейтингу'}]
    },
    {
      path: API_RELEASE_DATE+API_DESC,
      name: [{en: 'New', uk: 'Новими', ru: 'Новинкам'}]
    },
    {
      path: API_RELEASE_DATE+API_ASC,
      name: [{en: 'Old', uk: 'Старими', ru: 'Старым'}]
    }
  ];

  useEffect(() => {
    defaultTitle.map(el => setCurrentTitle(el[currentLang]));
    setSortBy([]);
  }, [currentLang, indexSectionBtn]);

  return (
    <div className={style.wrapp}>
      <p>{sortTitles.map(el => el[currentLang])}</p>

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
          {options.map((el, i) => (
            <li
              key={i}
              id={el.path}
              onClick={(e) => {
                setCurrentTitle(e.target.textContent);
                setSortBy(el.path);
                setIsOpen(false);
              }}
            >
              {el.name.map(l => l[currentLang])}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sort;