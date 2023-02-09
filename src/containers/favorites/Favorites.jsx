import { useContext } from 'react';

import VideoCard from '../../components/videoCard/VideoCard';
import EmptyPage from '../../components/errors/emptyPage/EmptyPage';
import { favoritesTitles } from '../../constans/titles';
import { getTitleLang } from '../../utils/functions';
import { Context } from '../../context/context';

import style from './favorites.module.scss';

const Favorites = () => {
  const { currentLang, favorites } = useContext(Context);

  return (
    <section className={style.favorites}>
      <h2>{getTitleLang(favoritesTitles, currentLang)}</h2>

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