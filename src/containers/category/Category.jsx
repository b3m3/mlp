import { useEffect, useState, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { getApiResults } from '../../service/getApiResources';
import { translateTitles } from '../../utils/functions';
import { API_ROOT, API_KEY, API_PAGE, API_LANGUAGE } from '../../constans/api';

import { Context } from '../../context/context';

import Card from '../../components/card/Card';

import style from './category.module.scss';


const Category = () => {
  const [results, setResults] = useState(null);
  const [errorApi, setErrorApi] = useState(false);

  const { currentLang } = useContext(Context);
  const { lang, langCode } = currentLang;
  const { video, category } = useParams();
  const { pathname } = useLocation();

  const titles = [
    {popular: [{en: 'Popular', ua: 'Популярні', ru: 'Популярные'}]},
    {now_playing: [{en: 'Now playing', ua: 'Зараз у прокаті', ru: 'Сейчас в прокате'}]},
    {upcoming: [{en: 'Upcoming', ua: 'Майбутні', ru: 'Предстоящие'}]},
    {top_rated: [{en: 'Top rated', ua: 'Найкращий рейтинг', ru: 'Лучший рейтинг'}]},
    {on_the_air: [{en: 'On the air', ua: 'В ефірі', ru: 'В эфире'}]},
    {airing_today: [{en: 'Airing today', ua: 'Сьогодні в ефірі', ru: 'Сегодня в эфире'}]}
  ];

  const url = API_ROOT+'/'+video+'/'+category+API_KEY+API_LANGUAGE+langCode;

  useEffect(() => {
    getApiResults(url, setResults, setErrorApi)
  }, [currentLang, pathname, url]);

  return (
    <section className={style.category}>
      <h2>
        {translateTitles(titles, category, lang)}
      </h2>

      <div className={style.body}>
        {results && results.results.map(props => (
          <Card
            key={props.id}
            {...props}
          />
        ))}
      </div>
    </section>
  );
}

export default Category;