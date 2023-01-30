import { useContext } from 'react';

import { Context } from '../../context/context';

import img from './img/img.webp';

import style from './search-error.module.scss';

const SearchError = () => {
  const { currentLang } = useContext(Context);
  
  const texts = [
    {en: 'No results found for your search, search again'},
    {uk: 'За вашим запитом нічого не знайдено, повторіть пошук'},
    {ru: 'По вашему запросу ничего не найдено, повторите поиск'}
  ];

  return (
    <div className={style.wrapp}>
      <img src={img} alt={'no search'} />
      <h4>{texts.map(t => t[currentLang])}</h4>
    </div>
  );
}

export default SearchError;