import { forwardRef } from 'react';

import style from './people-info.module.scss';

const PeopleInfo = forwardRef((props, ref) => {
  return (
    <div className={style.wrapp} ref={ref}>
      <h2>People Info</h2>
    </div>
  );
});

export default PeopleInfo;