import style from './genres.module.scss';

const Genres = ({ genres }) => {
  return (
    <>
      {genres && genres.length > 0 &&
        <ul className={style.list}>
          {genres.map(({ id, name }) => (
            <li key={id}>{name[0].toUpperCase()+name.slice(1)}</li>))}
        </ul>
      }
    </>
  );
}

export default Genres;