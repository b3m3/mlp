import { RiSearchLine } from 'react-icons/ri';

import style from './search.module.scss';

const Search = ({placeholder='films'}) => {
  return (
    <div className={style.search}>
      <RiSearchLine />
      <input 
        type="text" 
        placeholder={placeholder && `Serch for ${placeholder}`}
      />
    </div>
  );
}

export default Search;