import Preview from '../../components/preview/Preview';
import { MOVIES_POPULAR, MOVIES_TOP_RATED, MOVIES_NOW_PLAYING, MOVIES_UPCOMING } from '../../constans/api';

import style from './movies.module.scss';

const Movies = () => {
  const items = [
    {title: 'Popular', url: MOVIES_POPULAR},
    {title: 'Now playing', url: MOVIES_NOW_PLAYING},
    {title: 'Upcoming', url: MOVIES_UPCOMING},
    {title: 'Top rated', url: MOVIES_TOP_RATED}
  ];

  return (
    <section className={style.movies}>
      {items.map((props, i) => (
        <Preview key={i} {...props}/>
      ))}
    </section>
  );
}

export default Movies;