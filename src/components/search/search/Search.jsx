import { useEffect, useState, useContext } from 'react';

import { API_ROOT, API_GENRE, API_LIST, API_KEY, API_LANGUAGE, API_MOVIE, API_ACTORS, API_TV_SHOWS } from '../../../constans/api';
import { Context } from '../../../context/context';

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
  const [indexSectionBtn, setIndexSectionBtn] = useState(1);
  const [genresList, setGenresList] = useState(null);
  const [genresSelected, setGenresSelected] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [ratingValues, setRatingValues] = useState([]);
  const [years, setYears] = useState([]);

  const { currentLang } = useContext(Context);

  const mediaType = [API_MOVIE, API_TV_SHOWS, API_ACTORS];
  const isMediaTypeActors = mediaType[indexSectionBtn] === API_ACTORS;

  const activeBtn = {background:'var(--blue-400)'};

  const urlGenres = API_ROOT+API_GENRE+mediaType[indexSectionBtn]+API_LIST+API_KEY+API_LANGUAGE+currentLang;

  useEffect(() => {
    (async() => {
      if (!isMediaTypeActors) {
        const res = await getApiResources(urlGenres);
        return res && setGenresList(res.genres);
      }

      return setGenresList(null);
    })();
  }, [urlGenres, currentLang]);

  useEffect(() => {
    const handleClick = e => {
      if (!e.target.closest('.search')) {
        return setInputFocus(false);
      }
    };

    document.addEventListener('click', handleClick);
    return() => document.removeEventListener('click', handleClick);
  }, [currentLang]);

  console.log(ratingValues);

  return (
    <div className={`${style.search} search`}>
      <Input 
        mediaType={mediaType}
        setInputValue={setInputValue}
        setInputFocus={setInputFocus}
        indexSectionBtn={indexSectionBtn}
        inputValue={inputValue}
      />

      {inputFocus &&
        <div className={style.body}>
          <div className={style.row}>
            <SectionButtons 
              index={indexSectionBtn}
              setGenresSelected={setGenresSelected}
              setIndex={setIndexSectionBtn}
              activeBtn={activeBtn}
            />
          </div>

          {genresList &&
            <>
              <div className={style.row}>
                <ul className={style.genres_list}>
                  {genresList.map(({ id, name }) => (
                    <li key={id}>
                      <GenreButton
                        id={id} 
                        name={name} 
                        setState={setGenresSelected}
                        activeBtn={activeBtn}
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
                  onChange={({ min, max }) => (min, max)}
                  setState={setRatingValues}
                />
              </div>

              <div className={style.row}>
                <MultiRangeSlider
                  min={1875}
                  max={2030}
                  step={1}
                  onChange={({ min, max }) => (min, max)}
                  setState={setYears}
                />
              </div>

              <div className={style.row}>
                <Sort sortBy={sortBy} setSortBy={setSortBy} />
              </div>
            </>
          }
        </div>
      }
    </div>
  );
};

export default Search;