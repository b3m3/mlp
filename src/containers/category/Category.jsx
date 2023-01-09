import { useEffect, useState, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { getApiResults, getApiTotalPages } from '../../service/getApiResources';
import { translateTitles } from '../../utils/functions';
import { API_ROOT, API_KEY, API_PAGE, API_LANGUAGE } from '../../constans/api';

import PageNavigation from '../../components/ui/pageNavigation/PageNavigation';
import Shimmer from '../../components/ui/shimmer/Shimmer';

import { Context } from '../../context/context';

import Card from '../../components/card/Card';

import style from './category.module.scss';

const Category = () => {
  const [results, setResults] = useState(null);
  const [errorApi, setErrorApi] = useState(false);
  const [totalPages, setTotalPages] = useState(null);

  const { currentLang } = useContext(Context);
  const { lang, langCode } = currentLang;
  const { video, category, pageId } = useParams();
  const { pathname } = useLocation();

  const titles = [
    {popular: [{en: 'Popular', ua: 'Популярні', ru: 'Популярные'}]},
    {now_playing: [{en: 'Now playing', ua: 'Зараз у прокаті', ru: 'Сейчас в прокате'}]},
    {upcoming: [{en: 'Upcoming', ua: 'Майбутні', ru: 'Предстоящие'}]},
    {top_rated: [{en: 'Top rated', ua: 'Найкращий рейтинг', ru: 'Лучший рейтинг'}]},
    {on_the_air: [{en: 'On the air', ua: 'В ефірі', ru: 'В эфире'}]},
    {airing_today: [{en: 'Airing today', ua: 'Сьогодні в ефірі', ru: 'Сегодня в эфире'}]}
  ];

  const url = API_ROOT+'/'+video+'/'+category+API_KEY+API_LANGUAGE+langCode+API_PAGE+pageId;

  useEffect(() => {
    window.scrollTo(0, 0);
    getApiResults(url, setResults, setErrorApi);
    getApiTotalPages(url, setTotalPages);
  }, [currentLang, pathname, url]);

  return (
    <section className={style.category}>
      <h2>
        {translateTitles(titles, category, lang)}
      </h2>

      {errorApi
        ? <h2>Error</h2>
        : <div className={style.body}>
            {results 
              ? results.results.map(props => (
                <Card
                  key={props.id}
                  {...props}
                />
              ))
              : <>
                  {[...Array(20)].map((v, i) => (
                    <Shimmer key={i} />
                  ))}
                </>
            }
          </div>}

      <PageNavigation 
        totalPages={totalPages && totalPages > 500 ? 500 : totalPages}
      />
    </section>
  );
}

export default Category;