import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { API_MOVIE, API_ACTORS, API_TV_SHOWS } from '../../../../constants/api';

import Input from '../input/Input';
import SectionButtons from '../sectionButtons/SectionButtons';
import CardsList from '../cardsList/CardsList';
import GenresList from '../genresList/GenresList';
import AllResultsButton from '../allResultsButton/AllResultsButton';

import style from './search.module.scss';
import Sort from '../sort/Sort';
import MultiRangeSlider from '../multiRangeSlider/MultiRangeSlider';

const Search = () => {
  const [results, setResults] = useState(null);
  const [indexSectionBtn, setIndexSectionBtn] = useState(0);
  const [inputFocus, setInputFocus] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [genresSelected, setGenresSelected] = useState([]);
  const [sortBy, setSortBy] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [years, setYears] = useState([]);

  const language = useSelector(state => state.language.language);

  const mediaType = [API_MOVIE, API_TV_SHOWS, API_ACTORS];
  const isActors = mediaType[indexSectionBtn] === API_ACTORS;
  // const isMovie = mediaType[indexSectionBtn] === API_MOVIE;
  // const isTvShow = mediaType[indexSectionBtn] === API_TV_SHOWS;

  const currentYear = new Date().getFullYear();

  const activeBtn = {background:'var(--blue-400)'};
  const column = {flexDirection: 'column'}

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
    <div className={`${style.wrapp} search`}>
      <Input 
        mediaType={mediaType}
        indexSectionBtn={indexSectionBtn}
        inputValue={inputValue}
        genresSelected={genresSelected}
        sortBy={sortBy}
        ratings={ratings}
        years={years}
        inputFocus={inputFocus}
        setInputValue={setInputValue}
        setInputFocus={setInputFocus}
        setGenresSelected={setGenresSelected}
        setResults={setResults}
        setRatings={setRatings}
        setSortBy={setSortBy}
        setYears={setYears}
      />

      {inputFocus &&
        <div className={style.body}>
          <div className={style.row}>
            <SectionButtons 
              index={indexSectionBtn}
              activeBtn={activeBtn}
              setIndex={setIndexSectionBtn}
              setGenresSelected={setGenresSelected}
              setResults={setResults}
              setRatings={setRatings}
              setYears={setYears}
              setSortBy={setSortBy}
            />
          </div>

          {results && results.length > 0 &&
            <div className={style.row} style={column}>
              <CardsList
                results={results}
                isActors={isActors}
                type={mediaType[indexSectionBtn]}
                setResults={setResults}
                setGenresSelected={setGenresSelected}
                setInputValue={setInputValue}
                setRatings={setRatings}
                setYears={setYears}
                setSortBy={setSortBy}
                setInputFocus={setInputFocus}
              />
              <AllResultsButton
                inputValue={inputValue}
                sortBy={sortBy}
                genresSelected={genresSelected}
                years={years}
                ratings={ratings}
                mediaType={mediaType}
                indexSectionBtn={indexSectionBtn}
                setResults={setResults}
                setGenresSelected={setGenresSelected}
                setRatings={setRatings}
                setSortBy={setSortBy}
                setYears={setYears}
                setInputFocus={setInputFocus}
                setInputValue={setInputValue}
              />
            </div>
          }

          {!inputValue && !isActors &&
            <>
              <div className={style.row}>
                <GenresList
                  indexSectionBtn={indexSectionBtn}
                  activeBtn={activeBtn}
                  setGenresSelected={setGenresSelected}
                  genresSelected={genresSelected}
                  isActors={isActors}
                  mediaType={mediaType}
                />
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