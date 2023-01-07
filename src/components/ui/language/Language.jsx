import { useState, useContext } from 'react';

import { Context } from '../../../context/context';

import style from './language.module.scss';

const Language = () => {
  const [isActive, setIsActive] = useState(false);
  const { currentLang, setCurrentLang, languages } = useContext(Context);

  return (
    <div 
      className={style.language}
      onClick={() => setIsActive(a => !a)}
    >
      <p>{currentLang}</p>

      <ul style={isActive ? {height: '3.4375rem'} : null}>
        {languages.map(lang => (
          <li key={lang} onClick={() => setCurrentLang(lang)}>{lang}</li>
        ))}
      </ul>
    </div>
  );
}

export default Language;