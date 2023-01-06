import Preview from '../../components/preview/Preview';

import { SERIALS_POPULAR, SERIALS_TOP_RATED, SERIALS_AIRING_TODAY, SERIALS_ON_THE_AIR } from '../../constans/api';

import style from './serials.module.scss';

const Serials = () => {
  const items = [
    {title: 'Popular', url: SERIALS_POPULAR},
    {title: 'On the air', url: SERIALS_ON_THE_AIR},
    {title: 'Airing today', url: SERIALS_AIRING_TODAY},
    {title: 'Top rated', url: SERIALS_TOP_RATED}
  ];

  return (
    <section className={style.serials}>
      {items.map((props, i) => (
        <Preview key={i} {...props}/>
      ))}
    </section>
  );
}

export default Serials;