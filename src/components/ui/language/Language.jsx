import { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useParams, Route, Navigate } from 'react-router-dom';

import { Context } from '../../../context/context';
import { changeLangLocation } from '../../../utils/functions';
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
    addLS(pathname.split('/')[1]);

    if (localStorage.getItem(LANG_KEY)) {
      setCurrentLang(localStorage.getItem(LANG_KEY));
    } else {
      setCurrentLang('en');
    }
  }, [setCurrentLang, pathname]);

  const cg = lang => '/'+lang + pathname.slice(3);
  const addLS = lang => localStorage.setItem(LANG_KEY, lang);


  return (
    <div 
      className={style.language}
      onClick={() => setIsActive(a => !a)}
    >
      <p>{currentLang && currentLang.toUpperCase()}</p>

      <ul 
        style={isActive 
          ? {height: '5rem', border: '2px solid var(--blue-400)', background: 'rgba(27,39,58,1)'}
          : null}
      >
        {languages.map(lang => (
          <Link
            to={cg(lang)}
            key={lang} 
            onClick={() => {
              setCurrentLang(lang);
              addLS(lang);
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