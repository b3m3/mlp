import { useContext } from 'react';

import { Context } from '../../context/context';
import VideoCard from '../../components/videoCard/VideoCard';

import style from './favorites.module.scss';

const Favorites = () => {
  const { currentLang, favorites } = useContext(Context);

  const titles = [{en: 'Favorites', uk: 'Вибране', ru: 'Избранное'}];

  return (
    <section className={style.favorites}>
      <h2>{titles.map(t => t[currentLang])}</h2>

      <ul>
        {favorites && favorites.map(({id, poster_path, title, name, type}) => (
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
    </section>
  );
}

export default Favorites;