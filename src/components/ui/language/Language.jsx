import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../../store/slices/languageSlice';

import { addToLocalStorage, getFromLocalStorage } from '../../../utils/localStorage';
import { LANG_KEY } from '../../../constans/localStorage';
import { API_EN, API_UK, API_RU } from '../../../constans/api';

import style from './language.module.scss';

const Language = () => {
  const [isActive, setIsActive] = useState(false);

  const { pathname } = useLocation();

  const language = useSelector(state => state.language.language);
  const dispatch = useDispatch();
  
  const languages = [API_EN, API_UK, API_RU];

  const changeLang = useCallback((lang) => {
    dispatch(setLanguage(lang))
  }, [dispatch]);

  const getLocationLang = useMemo(() => {
    return pathname.split('/')[1]
  }, [pathname]);

  const setLangLocation = useCallback((lang) => {
    return '/'+lang + pathname.slice(3);
  }, [pathname]);
  
  useEffect(() => {
    const langLocation = getLocationLang;
    const isNoLang = langLocation !== API_EN && langLocation !== API_RU && langLocation !== API_UK;

    if (pathname === '/') {
      changeLang(API_EN);
    }

    if (pathname !== '/') {
      addToLocalStorage(LANG_KEY, isNoLang ? API_EN : langLocation);
    }

    if (getFromLocalStorage(LANG_KEY)) {
      changeLang(getFromLocalStorage(LANG_KEY));
    }
  }, [changeLang, getLocationLang, language, pathname]);
  
  useEffect(() => {
    const handleClick = e => {
      if (!e.target.closest('.language')) {
        return setIsActive(false);
      }
    };

    document.addEventListener('click', handleClick);
    return() => document.removeEventListener('click', handleClick);
  }, [language]);

  return (
    <div 
      className={`${style.language} language`}
      onClick={() => setIsActive(a => !a)}
    >
      <p>{language && language.toUpperCase()}</p>

      <ul className={isActive ? style.active : null}>
        {languages.map(lang => (
          <Link
            to={setLangLocation(lang)}
            key={lang} 
            onClick={() => {
              changeLang(lang);
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