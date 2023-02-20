import { useEffect, useState } from "react";

import style from './genre-button.module.scss';

const GenreButton = ({ name, id, indexSectionBtn, activeBtn, setGenresSelected }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(false);
  }, [indexSectionBtn]);

  return (
    <button
      onClick={() => {
        isActive 
          ? setGenresSelected(a => a.filter(el => el.name !== name))
          : setGenresSelected(c => [...c, {id, name}]);

        setIsActive(a => !a);
      }}
      className={style.btn}
      style={isActive ? activeBtn : null}
    >
      {name[0].toUpperCase() + name.slice(1)}
    </button>
  );
}

export default GenreButton;