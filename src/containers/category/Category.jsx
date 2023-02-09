import { useEffect, useState, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { categoryTitles, discoverTitles } from '../../constans/titles';
import { getApiResources, getApiItem } from '../../service/getApiResources';
import { translateCategoryTitle, getTitleLang } from '../../utils/functions';
import { API_ROOT, API_KEY, API_PAGE, API_LANGUAGE, API_QUERY, API_DISCOVER, API_SEARCH } from '../../constans/api';

import PageNavigation from '../../components/ui/pageNavigation/PageNavigation';
import ErrorApi from '../../components/errors/errorApi/ErrorApi';
import SearchError from '../../components/errors/searchError/SearchError';

import { Context } from '../../context/context';

import VideoCard from '../../components/videoCard/VideoCard';
import ActorCard from '../../components/actorCard/ActorCard';
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
    getApiItem(url, 'total_pages', setTotalPages);

    (async() => {
      const res = await getApiResources(url);

      if (res) {
        setResults(res);
      } else {
        setErrorApi(true);
      }

      if (isSearch && res && res.results.length < 1) {
        setNoSearchResults(true);
      }

      if (isDiscover && res && res.results.length < 1) {
        setNoSearchResults(true);
      }
    })();
  }, [currentLang, pathname, url, isSearch, isDiscover]);

  return (
    <section className={style.category}>
      <h2>
        {isSearch 
          ? id 
          : isDiscover 
            ? getTitleLang(discoverTitles, currentLang)
            : translateCategoryTitle(categoryTitles, category, currentLang)
        }
      </h2>

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

      {noSearchResults && <SearchError value={id}/>}

      <PageNavigation 
        totalPages={totalPages && totalPages > 500 ? 500 : totalPages}
      />
    </section>
  );
}

export default Category;