import { useCallback } from 'react';

import style from './section-buttons.module.scss';

const buttonsName = [
  {en: ['Movies', 'TV Shows', 'Actors']},
  {uk: ['Фільми', 'Серіали', 'Актори']},
  {ru: ['Фильмы', 'Сериалы', 'Актеры']}
];

const SectionButtons = ({indexSectionBtn, setIndexSectionBtn, activeBtn, setResults, setRatings, 
  setYears, setSortBy, setGenresSelected, language}) => {
    
  const handleClear = useCallback(() => {
    setResults(null);
    setGenresSelected([]);
    setRatings([]);
    setYears([]);
    setSortBy([]);
  }, [setGenresSelected, setResults, setRatings, setYears, setSortBy]);

  return (
    <div className={style.wrapp}>
      {buttonsName.map(el => el[language] && 
        el[language].map((btn, i) => (
          <button 
            key={i}
            onClick={() => {
              setIndexSectionBtn(i);
              handleClear();
            }}
            className={style.btn}
            style={indexSectionBtn === i ? activeBtn : null}
          >
            {btn}
          </button>
        )))
      }
    </div>
  );
}

export default SectionButtons;