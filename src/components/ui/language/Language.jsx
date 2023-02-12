import { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Context } from '../../../context/context';
import { changeLangLocation, getLangIdFromLocation } from '../../../utils/functions';
import { addToLocalStorage, getFromLocalStorage } from '../../../utils/localStorage';
import { LANG_KEY } from '../../../constans/localStorage';
import { API_EN, API_UK, API_RU } from '../../../constans/api';

import style from './language.module.scss';

const Language = () => {
  const [isActive, setIsActive] = useState(false);

  const { pathname } = useLocation();
  const { currentLang, setCurrentLang } = useContext(Context);
  
  const languages = [API_EN, API_UK, API_RU];
  
  useEffect(() => {
    const langLocation = getLangIdFromLocation(pathname);
    const isNoLang = langLocation !== API_EN && langLocation !== API_RU && langLocation !== API_UK;

    if (pathname === '/') {
      setCurrentLang(API_EN);
    }

    if (pathname !== '/') {
      addToLocalStorage(LANG_KEY, isNoLang ? API_EN : langLocation);
    }

    if (getFromLocalStorage(LANG_KEY)) {
      setCurrentLang(getFromLocalStorage(LANG_KEY));
    }
  }, [setCurrentLang, currentLang, pathname]);
  
  useEffect(() => {
    const handleClick = e => {
      if (!e.target.closest('.language')) {
        return setIsActive(false);
      }
    };

    document.addEventListener('click', handleClick);
    return() => document.removeEventListener('click', handleClick);
  }, [currentLang]);

  return (
    <div 
      className={`${style.language} language`}
      onClick={() => setIsActive(a => !a)}
    >
      <p>{currentLang && currentLang.toUpperCase()}</p>

      <ul className={isActive ? style.active : null}>
        {languages.map(lang => (
          <Link
            to={changeLangLocation(pathname, lang)}
            key={lang} 
            onClick={() => {
              setCurrentLang(lang);
              addToLocalStorage(LANG_KEY, lang);
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