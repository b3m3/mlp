import { useSelector } from 'react-redux';

import { getTitleLang } from '../../../../utils/functions';

import img from './img/img.webp';

import style from './search-error.module.scss';

const titles = [
  {
    en: 'No results found for your search, search again',
    uk: 'За вашим запитом нічого не знайдено, повторіть пошук',
    ru: 'По вашему запросу ничего не найдено, повторите поиск'
  }
];

const SearchError = () => {
  const language = useSelector(state => state.language.language);

  const title = getTitleLang(titles, language);
  
  return (
    <div className={style.wrapp}>
      <img src={img} alt={'no search'} />
      <h4>{title}</h4>
    </div>
  );
}

export default SearchError;