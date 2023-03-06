import VideoCard from '../videoCard/VideoCard';
import style from './favorite-list.module.scss';

const FavoriteList = ({ title, results, type }) => {
  return (
    <>
      {results && results.length > 0 &&
        <div className={style.wrapp}>
          <h2>{title}</h2>
          
          <ul>
            {results.map(props => (
              <li key={props.id}>
                <VideoCard {...props} type={type} />
              </li>
            ))}
          </ul>
        </div>
      }
    </>
  );
}

export default FavoriteList;