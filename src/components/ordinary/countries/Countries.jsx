import style from './countries.module.scss';

const Countries = ({ countries }) => {
  const isString = typeof countries === 'string';

  return (
    <>
      {countries && countries.length > 0 &&
        <ul className={style.list}>
          { isString
            ? <li>{countries}</li>
            : countries.map(({ name }, i) => (
                <li key={i}>{name}</li>
              ))
          }
        </ul>
      }
    </>
  );
}

export default Countries;