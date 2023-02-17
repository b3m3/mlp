import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import style from './section-buttons.module.scss';

const SectionButtons = ({ index, setIndex, activeBtn, setGenresSelected }) => {
  const language = useSelector(state => state.language.language);

  const buttonsName = useMemo(() => [
    {en: ['Movies', 'TV Shows', 'Actors']},
    {uk: ['Фільми', 'Серіали', 'Актори']},
    {ru: ['Фильмы', 'Сериалы', 'Актеры']}
  ], []);

  return (
    <div className={style.wrapp}>
      {buttonsName.map(el => el[language] && 
        el[language].map((btn, i) => (
          <button 
            key={i}
            onClick={() => {
              setIndex(i);
              setGenresSelected([]);
            }}
            className={style.btn}
            style={index === i ? activeBtn : null}
          >
            {btn}
          </button>
        )))
      }
    </div>
  );
}

export default SectionButtons;