import { forwardRef } from 'react';

import style from './info-actor.module.scss';

const InfoActor = forwardRef((props, ref) => {
  return (
    <div className={style.wrapp} ref={ref}>
      InfoActor.jsx
    </div>
  );
});

export default InfoActor;