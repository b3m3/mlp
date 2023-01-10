import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Context } from '../../../context/context';
import { changeLangLocation } from '../../../utils/functions';
import { addToLocalStorage } from '../../../utils/localStorage';
import { LANG_KEY } from '../../../constans/localStorage';

import style from './language.module.scss';

const Language = () => {
  const [isActive, setIsActive] = useState(false);

  const { pathname } = useLocation();
  const { currentLang, setCurrentLang, languages } = useContext(Context);
  const { lang } = currentLang;

  return (
    <div 
      className={style.language}
      onClick={() => setIsActive(a => !a)}
    >
      <p>{lang && lang.toUpperCase()}</p>

      <ul 
        style={isActive 
          ? {height: '5rem', border: '2px solid var(--blue-400)', background: 'rgba(27,39,58,1)'}
          : null}
      >
        {languages && languages.map(({lang, langCode}) => (
          <Link
            to={changeLangLocation(pathname, lang)}
            key={lang} 
            onClick={() => {
              setCurrentLang({lang, langCode})
              addToLocalStorage(LANG_KEY, {lang, langCode})
            }}
          >
            {lang.toUpperCase()}
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Language;