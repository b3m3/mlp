import { useContext } from 'react';

import { Context } from '../../../context/context';

import style from './section-buttons.module.scss';

const SectionButtons = ({ index, setIndex, setGenresSelected, activeBtn }) => {
  const { currentLang } = useContext(Context);

  const buttonsName = [
    {en: ['Movies', 'TV Shows', 'Actors']},
    {uk: ['Фільми', 'Серіали', 'Актори']},
    {ru: ['Фильмы', 'Сериалы', 'Актеры']}
  ];

  return (
    <div className={style.wrapp}>
      {buttonsName.map(el => el[currentLang] && 
        el[currentLang].map((btn, i) => (
          <button 
            key={i}
            onClick={() => setIndex(i)}
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