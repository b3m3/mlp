import VideoCard from '../videoCard/VideoCard';
import EmptyPage from '../../ui/errors/emptyPage/EmptyPage';
import Loading from '../../ui/loading/Loading';

import style from './favorite-list.module.scss';

const FavoriteList = ({ title, results, type }) => {
  return (
    <div className={style.wrapp}>
      <h2>{title}</h2>

      {results && results.length > 0 
        ? <ul>
            {results.map(props => (
              <li key={props.id}>
                <VideoCard {...props} type={type} />
              </li>
            ))}
          </ul>
        : <EmptyPage />
      }
      
      {!results && <Loading />}
    </div>
  );
}

export default FavoriteList;