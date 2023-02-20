import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { API_ROOT, API_GENRE, API_LIST, API_KEY, API_LANGUAGE, API_MOVIE, API_ACTORS, API_TV_SHOWS } from '../../../constants/api';

import Input from '../input/Input';
import SectionButtons from '../sectionButtons/SectionButtons';
import GenreButton from '../genreButton/GenreButton';

import style from './search.module.scss';
import { getApiResources } from '../../../service/getApiResources';
import Sort from '../sort/Sort';
import MultiRangeSlider from '../multiRangeSlider/MultiRangeSlider';

const Search = () => {
  const [inputFocus, setInputFocus] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [indexSectionBtn, setIndexSectionBtn] = useState(0);
  const [genresList, setGenresList] = useState(null);
  const [genresSelected, setGenresSelected] = useState([]);
  const [sortBy, setSortBy] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [years, setYears] = useState([]);

  const language = useSelector(state => state.language.language);

  const mediaType = [API_MOVIE, API_TV_SHOWS, API_ACTORS];
  const isActors = mediaType[indexSectionBtn] === API_ACTORS;

  const currentYear = new Date().getFullYear();

  const activeBtn = {background:'var(--blue-400)'};

  const urlGenres = API_ROOT+API_GENRE+mediaType[indexSectionBtn]+API_LIST+API_KEY+API_LANGUAGE+language;

  useEffect(() => {
    (async() => {
      if (!isActors) {
        const res = await getApiResources(urlGenres);
        return res && setGenresList(res.genres);
      }

      return setGenresList(null);
    })();
  }, [urlGenres, language, isActors]);

  useEffect(() => {
    const handleClick = e => {
      if (!e.target.closest('.search')) {
        return setInputFocus(false);
      }
    };

    document.addEventListener('click', handleClick);
    return() => document.removeEventListener('click', handleClick);
  }, [language]);

  return (
    <div className={`${style.search} search`}>
      <Input 
        mediaType={mediaType}
        indexSectionBtn={indexSectionBtn}
        inputValue={inputValue}
        genresSelected={genresSelected}
        sortBy={sortBy}
        ratings={ratings}
        years={years}
        setInputValue={setInputValue}
        setInputFocus={setInputFocus}
        setGenresSelected={setGenresSelected}
      />

      {inputFocus &&
        <div className={style.body}>
          <div className={style.row}>
            <SectionButtons 
              index={indexSectionBtn}
              activeBtn={activeBtn}
              setIndex={setIndexSectionBtn}
              setGenresSelected={setGenresSelected}
            />
          </div>

          {genresList && !inputValue &&
            <>
              <div className={style.row}>
                <ul className={style.genres_list}>
                  {genresList.map(({ id, name }) => (
                    <li key={id}>
                      <GenreButton
                        id={id} 
                        name={name} 
                        indexSectionBtn={indexSectionBtn}
                        activeBtn={activeBtn}
                        setGenresSelected={setGenresSelected}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div className={style.row}>
                <MultiRangeSlider
                  min={1}
                  max={10}
                  step={0.1}
                  onChange={({ min, max }) => ({min, max})}
                  setState={setRatings}
                  indexSectionBtn={indexSectionBtn}
                />
              </div>

              <div className={style.row}>
                <MultiRangeSlider
                  min={1814}
                  max={currentYear}
                  step={1}
                  onChange={({ min, max }) => ({min, max})}
                  setState={setYears}
                  indexSectionBtn={indexSectionBtn}
                />
              </div>

              <div className={style.row}>
                <Sort 
                  indexSectionBtn={indexSectionBtn} 
                  setSortBy={setSortBy}
                />
              </div>
            </>
          }
        </div>
      }
    </div>
  );
};

export default Search;