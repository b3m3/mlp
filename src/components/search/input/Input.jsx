import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { API_SEARCH } from '../../../constans/api';
import { Context } from '../../../context/context';

import { RiSearchLine } from 'react-icons/ri';
import style from './input.module.scss';

const Input = ({ mediaType, setInputValue, setInputFocus, indexSectionBtn, inputValue }) => {
  const { currentLang } = useContext(Context);

  const link = `/${currentLang}${mediaType[indexSectionBtn]}${API_SEARCH}/${inputValue}/1`;

  return (
    <div className={style.wrapp}>
      <input 
        type="text" 
        placeholder={'Enter your request'}
        onChange={e => setInputValue(e.target.value)}
        onClick={() => setInputFocus(true)}
        value={inputValue}
      /> 
      <Link
        to={inputValue ? link : null}
        className={inputValue && style.active}
        onClick={() => {
          setInputValue('');
          setInputFocus(false);
        }}
      >
        <RiSearchLine />
      </Link>
    </div>
  );
}

export default Input;