import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { API_SEARCH, API_DISCOVER, API_WITH_GENRES, API_SORT, API_LTE, API_GTE, 
  API_RELEASE_DATE, API_VOTE_AVERAGE, API_VOTE_COUNT, API_FIRST_AIR_DATE } from '../../../constants/api';

import { RiSearchLine } from 'react-icons/ri';
import style from './input.module.scss';

const Input = ({mediaType, setInputValue, setInputFocus, indexSectionBtn, inputValue, 
  setGenresSelected, genresSelected, sortBy, ratings, years}) => {

    const language = useSelector(state => state.language.language);

  const activeBtnStyle = {color: 'var(--gray-50)'}

  const type = mediaType[indexSectionBtn];
  const isTypeMovie = type === '/movie';

  const isSort = 
    sortBy.length > 0
      ? API_SORT+sortBy.slice(1)+API_VOTE_COUNT+API_GTE+15
      : '';

  const isGenres = 
    genresSelected.length > 0 
      ? API_WITH_GENRES+genresSelected.map(({id}) => id) 
      : '';

  const isYears = 
    years.length > 0 
      ? isTypeMovie 
        ? API_RELEASE_DATE+API_GTE+years[0]+API_RELEASE_DATE+API_LTE+years[1]
        : API_FIRST_AIR_DATE+API_GTE+years[0]+API_FIRST_AIR_DATE+API_LTE+years[1]
      : '';

  const isRating = 
    ratings.length > 0 
      ? API_VOTE_AVERAGE+API_GTE+ratings[0]+API_VOTE_AVERAGE+API_LTE+ratings[1] 
      : '';

  const isValue = sortBy.length > 0 || genresSelected.length > 0 || 
    ratings.length > 0 ||  years.length > 0 || inputValue;

  const link = 
    inputValue 
      ? `/${language}${type}${API_SEARCH}/${inputValue}/1`
      : `/${language}${type}${API_DISCOVER}/${isSort}${isGenres}${isRating}${isYears}/1`;

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
        to={isValue ? link : null}
        onClick={() => {
          setInputValue('');
          setInputFocus(false);
          setGenresSelected([]);
        }}
      >
        <RiSearchLine 
          style={isValue ? activeBtnStyle : null}
        />
      </Link>
    </div>
  );
}

export default Input;