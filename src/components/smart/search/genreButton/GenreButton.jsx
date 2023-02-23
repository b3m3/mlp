import { useCallback, useEffect, useState } from "react";

import style from './genre-button.module.scss';

const GenreButton = ({ name, id, indexSectionBtn, activeBtn, setGenresSelected }) => {
  const [isActive, setIsActive] = useState(false);

  const handleRemove = useCallback(() => {
    return setGenresSelected(a => a.filter(el => el.name !== name));
  }, [setGenresSelected, name]);

  const handleAdd = useCallback(() => {
    return setGenresSelected(c => [...c, {id, name}]);
  }, [setGenresSelected, id, name]); 

  useEffect(() => {
    setIsActive(false);
    setGenresSelected([]);
  }, [indexSectionBtn, setGenresSelected]);

  const nameBtn = name[0].toUpperCase() + name.slice(1);

  return (
    <button
      onClick={() => {
        isActive ? handleRemove() : handleAdd()
        setIsActive(a => !a);
      }}
      className={style.btn}
      style={isActive ? activeBtn : null}
    >
      {nameBtn}
    </button>
  );
}

export default GenreButton;