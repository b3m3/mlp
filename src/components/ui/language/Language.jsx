import { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Context } from '../../../context/context';
import { changeLangLocation, getLangIdFromLocation } from '../../../utils/functions';
import { addToLocalStorage } from '../../../utils/localStorage';
import { LANG_KEY } from '../../../constans/localStorage';
import { API_EN, API_UK, API_RU } from '../../../constans/api';

import style from './language.module.scss';

const Language = () => {
  const [isActive, setIsActive] = useState(false);

  const { pathname } = useLocation();
  const { currentLang, setCurrentLang } = useContext(Context);

  const languages = [API_EN, API_UK, API_RU];

  useEffect(() => {
    if (pathname === '/') {
      setCurrentLang('en');
    }

    if (pathname !== '/') {
      addToLocalStorage(LANG_KEY, getLangIdFromLocation(pathname));
    }
    
    if (localStorage.getItem(LANG_KEY)) {
      setCurrentLang(localStorage.getItem(LANG_KEY));
    } 
  }, [setCurrentLang, pathname]);

  return (
    <div 
      className={style.language}
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