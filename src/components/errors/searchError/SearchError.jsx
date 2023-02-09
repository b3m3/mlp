import { useContext } from 'react';

import { Context } from '../../../context/context';
import { searchErrorTitles } from '../../../constans/titles';
import { getTitleLang } from '../../../utils/functions';

import img from './img/img.webp';

import style from './search-error.module.scss';

const SearchError = () => {
  const { currentLang } = useContext(Context);
  
  return (
    <div className={style.wrapp}>
      <img src={img} alt={'no search'} />
      <h4>{getTitleLang(searchErrorTitles, currentLang)}</h4>
    </div>
  );
}

export default SearchError;