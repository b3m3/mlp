import { useContext, useEffect, useState } from 'react';

import { Context } from '../../context/context';
import VideoCard from '../../components/videoCard/VideoCard';

import style from './favorites.module.scss';

const Favorites = () => {
  // const [favoriteItems, setFavoriteItems] = useState([]);
  const { currentLang, favorites } = useContext(Context);

  const titles = [{en: 'Favorites', uk: 'Вибране', ru: 'Избранное'}];

  // useEffect(() => {
  //   if (favorites) {
  //     for (const key in favorites) {
  //       setFavoriteItems(c => [...c, favorites[key]]);
  //     }
  //   }
  // }, []);

  // const df = () => {
  //   if (favorites) {
  //     for (const key in favorites) {
  //       const {id, poster_path, title, name} = favorites[key];
  
  //       return(
  //         <VideoCard 
  //           id={id}
  //           poster_path={poster_path}
  //           title={title}
  //           name={name}
  //         />
  //       )
  //     }
  //   }
  // };

  return (
    <section className={style.favorites}>
      <h2>{titles.map(t => t[currentLang])}</h2>

      <ul>
        {/* {df()} */}
        {/* {favoriteItems && favoriteItems.map(({ id, poster_path, title, name }) => (
          <li key={id}>
            <VideoCard 
              id={id}
              poster_path={poster_path}
              title={title}
              name={name}
            />
          </li>
        ))} */}
      </ul>
    </section>
  );
}

export default Favorites;