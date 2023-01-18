import style from './countries.module.scss';

const Countries = ({ countries }) => {
  return (
    <>
      {countries && countries.length > 0 &&
        <ul className={style.list}>
          {countries.map(({ name }, i) => (
            <li key={i}>{name}</li>
          ))}
        </ul>
      }
    </>
  );
}

export default Countries;