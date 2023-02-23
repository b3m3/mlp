import { useCallback, useEffect, useState } from "react";

import style from './genre-button.module.scss';

const GenreButton = ({ name, id, indexSectionBtn, activeBtn, genresSelected, setGenresSelected }) => {
  const [isActive, setIsActive] = useState(false);

  const activeSelected = useCallback(() => {
    return genresSelected.filter(genre => genre.id === id && setIsActive(true));
  }, [genresSelected, id]);

  const handleRemove = useCallback(() => {
    return setGenresSelected(a => a.filter(el => el.name !== name));
  }, [setGenresSelected, name]);

  const handleAdd = useCallback(() => {
    return setGenresSelected(c => [...c, {id, name}]);
  }, [setGenresSelected, id, name]); 

  useEffect(() => {
    setIsActive(false);
    activeSelected();
  }, [indexSectionBtn, activeSelected]);

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