import { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Context } from '../../../context/context';
import { changeLangLocation } from '../../../utils/functions';
import { addToLocalStorage, getFromLocalStorage } from '../../../utils/localStorage';
import { LANG_KEY } from '../../../constans/localStorage';
import { LANG, API_EN, API_UK, API_RU } from '../../../constans/api';

import style from './language.module.scss';

const Language = () => {
  const [isActive, setIsActive] = useState(false);

  const { pathname } = useLocation();
  const { currentLang, setCurrentLang } = useContext(Context);
  const { lang } = currentLang;

  const languages = [
    {lang: 'en', langCode: API_EN},
    {lang: 'ua', langCode: API_UK},
    {lang: 'ru', langCode: API_RU}
  ];

  useEffect(() => {
    setCurrentLang({lang: 'en', langCode: API_EN});

    if (localStorage.getItem(LANG_KEY)) {
      setCurrentLang(getFromLocalStorage(LANG_KEY));
    }
  }, [setCurrentLang]);

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
        {languages.map(({lang, langCode}) => (
          <Link
            to={changeLangLocation(pathname, LANG, lang)}
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