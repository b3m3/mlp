import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFetching } from '../../hooks/useFetching';

import { getTitleLang } from '../../utils/functions';
import { API_ROOT, API_KEY, API_PAGE, API_LANGUAGE, API_QUERY, API_DISCOVER, API_SEARCH } from '../../constants/api';

import PageNavigation from '../../components/ordinary/pageNavigation/PageNavigation';
import ErrorApi from '../../components/ui/errors/errorApi/ErrorApi';
import SearchError from '../../components/ui/errors/searchError/SearchError';

import VideoCard from '../../components/ordinary/videoCard/VideoCard';
import ActorCard from '../../components/ordinary/actorCard/ActorCard';
import ShimmerActorCard from '../../components/ui/shimmers/shimmerActorCard/ShimmerActorCard';
import ShimmerVideoCard from '../../components/ui/shimmers/shimmerVideoCard/ShimmerVideoCard';

import style from './category.module.scss';

const titles = [
  {popular: [{en: 'Popular', uk: 'Популярні', ru: 'Популярные'}]},
  {now_playing: [{en: 'Now playing', uk: 'Зараз у прокаті', ru: 'Сейчас в прокате'}]},
  {upcoming: [{en: 'Upcoming', uk: 'Майбутні', ru: 'Предстоящие'}]},
  {top_rated: [{en: 'Top rated', uk: 'Найкращий рейтинг', ru: 'Лучший рейтинг'}]},
  {on_the_air: [{en: 'On the air', uk: 'В ефірі', ru: 'В эфире'}]},
  {airing_today: [{en: 'Airing today', uk: 'Сьогодні в ефірі', ru: 'Сегодня в эфире'}]}
];

const discoverTitles = [
  {en: 'Custom filter', uk: 'Користувальницький фільтр', ru: 'Пользовательский фильтр'}
];

const Category = () => {
  const [noSearchResults, setNoSearchResults] = useState(false);
  const language = useSelector(state => state.language.language);

  const { type, category, page, id } = useParams();
  const { pathname } = useLocation();

  const isSearch = category === 'search';
  const isDiscover = category === 'discover';

  const categoryUrl = API_ROOT+'/'+type+'/'+category+API_KEY+API_LANGUAGE+language+API_PAGE+page;
  const searchUrl = API_ROOT+API_SEARCH+'/'+type+API_KEY+API_LANGUAGE+language+API_QUERY+id+API_PAGE+page;
  const discoverUrl = API_ROOT+API_DISCOVER+'/'+type+API_KEY+API_LANGUAGE+language+id+API_PAGE+page;
  
  const translateTitle = useMemo(() => {
    return titles.map(el => el[category] && el[category][0][language]);
  }, [category, language]);
  
  const title = isSearch ? id : isDiscover ? getTitleLang(discoverTitles, language) : translateTitle;
  const url = isSearch ? searchUrl : isDiscover ? discoverUrl : categoryUrl;

  const { results, setResults, errorApi } = useFetching(url);

  const pages =  useMemo(() => {
    if (results) {
      return results.total_pages > 500 ? 500 : results.total_pages;
    }
  }, [results]);

  useEffect(() => {
    setResults(null);
    setNoSearchResults(false);
  }, [language, pathname, isSearch, isDiscover, setResults]);

  useEffect(() => {
    if (results) {
      if ((isSearch || isDiscover) && results.results.length < 1) {
        setNoSearchResults(true);
      }
    }
  }, [results, isSearch, isDiscover]);

  return (
    <section className={style.category}>
      <h2>{title}</h2>

      {errorApi
        ? isSearch ?  <SearchError /> : <ErrorApi />
        : <div className={style.body}>
            {results
              ? results.results.map(props => (
                  <div key={props.id}>
                    {type === 'person' 
                      ? <ActorCard {...props} onHover />
                      : <VideoCard {...props} />
                    }
                  </div>
                ))
              : <>
                  {[...Array(20)].map((v, i)=>
                    <div key={i}>
                      {type === 'person'
                        ? <ShimmerActorCard />
                        : <ShimmerVideoCard />
                      }
                    </div>
                  )}
                </>
            }
          </div>}

      {noSearchResults 
        ? <SearchError value={id}/> 
        : <PageNavigation totalPages={pages}/>
      }
    </section>
  );
}

export default Category;