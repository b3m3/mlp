import { useEffect, useState, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { getApiResources, getApiTotalPages } from '../../service/getApiResources';
import { translateCategoryTitle } from '../../utils/functions';
import { API_ROOT, API_KEY, API_PAGE, API_LANGUAGE, API_QUERY, API_DISCOVER, API_SEARCH } from '../../constans/api';

import PageNavigation from '../../components/ui/pageNavigation/PageNavigation';
import Error from '../../components/error/Error';

import { Context } from '../../context/context';

import VideoCard from '../../components/videoCard/VideoCard';
import ActorCard from '../../components/actorCard/ActorCard';
import SearchError from '../../components/searchError/SearchError';
import ShimmerActorCard from '../../components/ui/shimmers/shimmerActorCard/ShimmerActorCard';
import ShimmerVideoCard from '../../components/ui/shimmers/shimmerVideoCard/ShimmerVideoCard';

import style from './category.module.scss';

const Category = () => {
  const [results, setResults] = useState(null);
  const [errorApi, setErrorApi] = useState(false);
  const [noSearchResults, setNoSearchResults] = useState(false);
  const [totalPages, setTotalPages] = useState(null);

  const { currentLang } = useContext(Context);
  const { type, category, page, id } = useParams();
  const { pathname } = useLocation();

  const titles = [
    {popular: [{en: 'Popular', uk: 'Популярні', ru: 'Популярные'}]},
    {now_playing: [{en: 'Now playing', uk: 'Зараз у прокаті', ru: 'Сейчас в прокате'}]},
    {upcoming: [{en: 'Upcoming', uk: 'Майбутні', ru: 'Предстоящие'}]},
    {top_rated: [{en: 'Top rated', uk: 'Найкращий рейтинг', ru: 'Лучший рейтинг'}]},
    {on_the_air: [{en: 'On the air', uk: 'В ефірі', ru: 'В эфире'}]},
    {airing_today: [{en: 'Airing today', uk: 'Сьогодні в ефірі', ru: 'Сегодня в эфире'}]}
  ];

  const isSearch = category === 'search';
  const isDiscover = category === 'discover';

  const categoryUrl = API_ROOT+'/'+type+'/'+category+API_KEY+API_LANGUAGE+currentLang+API_PAGE+page;
  const searchUrl = API_ROOT+API_SEARCH+'/'+type+API_KEY+API_LANGUAGE+currentLang+API_QUERY+id+API_PAGE+page;
  const discoverUrl = API_ROOT+API_DISCOVER+'/'+type+API_KEY+API_LANGUAGE+currentLang+id+API_PAGE+page;

  const url = isSearch ? searchUrl : isDiscover ? discoverUrl : categoryUrl;

  useEffect(() => {
    setResults(null);
    setNoSearchResults(false);
    window.scrollTo(0, 0);
    getApiTotalPages(url, setTotalPages);

    (async() => {
      const res = await getApiResources(url);

      if (res) {
        setResults(res);
      } else {
        setErrorApi(true);
      }

      if (isSearch || isDiscover && res && res.results.length < 1) {
        setNoSearchResults(true);
      }
    })();
  }, [currentLang, pathname, url]);

  return (
    <section className={style.category}>
      <h2>
        {isSearch ? id : translateCategoryTitle(titles, category, currentLang)}
      </h2>

      {errorApi
        ? <Error />
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
        : <PageNavigation 
            totalPages={totalPages && totalPages > 500 ? 500 : totalPages}
          />
        }
    </section>
  );
}

export default Category;