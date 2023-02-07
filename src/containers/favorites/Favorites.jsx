import { useContext } from 'react';

import { Context } from '../../context/context';
import VideoCard from '../../components/videoCard/VideoCard';
import EmptyPage from '../../components/emptyPage/EmptyPage';

import style from './favorites.module.scss';

const Favorites = () => {
  const { currentLang, favorites } = useContext(Context);

  const titles = [{en: 'Favorites', uk: 'Обране', ru: 'Избранное'}];

  return (
    <section className={style.favorites}>
      <h2>{titles.map(t => t[currentLang])}</h2>

      {favorites && favorites.length > 0
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