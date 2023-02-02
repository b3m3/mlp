import style from './genre-button.module.scss';

import { useState } from "react";

const Gi = ({ name, id, setState, activeBtn }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      onClick={() => {
        isActive 
          ? setState(a => a.filter(el => el.name !== name))
          : setState(c => [...c, {id, name}]);

        setIsActive(a => !a);
      }}
      className={style.btn}
      style={isActive ? activeBtn : null}
    >
      {name[0].toUpperCase() + name.slice(1)}
    </button>
  );
}

export default Gi;