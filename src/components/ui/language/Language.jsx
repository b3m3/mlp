import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Context } from '../../../context/context';
import { setLanguagePathname } from '../../../utils/functions';

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
      <p>{lang.toUpperCase()}</p>

      <ul 
        style={isActive 
          ? {height: '5rem', border: '2px solid var(--blue-400)'} 
          : null}
      >
        {languages.map(({lang, langCode}) => (
          <Link
            to={setLanguagePathname(pathname, lang)}
            key={lang} 
            onClick={() => setCurrentLang({lang, langCode})}
          >
            {lang.toUpperCase()}
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Language;