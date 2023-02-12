import { useContext, useEffect, useRef } from 'react';

import VideoCard from '../../components/videoCard/VideoCard';
import EmptyPage from '../../components/errors/emptyPage/EmptyPage';
import { favoritesTitles } from '../../constans/titles';
import { FAVORITE_KEY } from '../../constans/localStorage';
import { getTitleLang } from '../../utils/functions';
import { removeItemFromLocalStorage } from '../../utils/localStorage';
import { Context } from '../../context/context';

import style from './favorites.module.scss';

const Favorites = () => {
  const { currentLang, favorites, setFavorites } = useContext(Context);

  const ref = useRef(null)

  useEffect(() => {
    const onClearArr = (e) => {
      if (e.target && !favorites.length) {
        setFavorites([]);
        removeItemFromLocalStorage(FAVORITE_KEY);
      }
    }

    document.addEventListener('click', onClearArr);
    return() => document.removeEventListener('click', onClearArr);
  }, [favorites, setFavorites]);

  return (
    <section className={style.favorites} ref={ref}>
      <h2>{getTitleLang(favoritesTitles, currentLang)}</h2>

      {favorites.length > 0
        ? <ul>
            {favorites.map(({id, poster_path, title, name, type}) => (
              <li key={id}>
                <VideoCard 
                  id={id}
                  poster_path={poster_path}
                  title={title}
                  name={name}
                  type={type}
                />
              </li>
            ))}
          </ul>
        : <EmptyPage />
      }
    </section>
  );
}

export default Favorites;