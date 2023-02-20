import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import ShimmerPhotos from '../../ui/shimmers/shimmerPhotos/ShimmerPhotos';
import Backdrop from '../../ui/backdrop/Backdrop';
import PhotoGallery from '../photoGallery/PhotoGallery';
import { getApiResources } from '../../../service/getApiResources';
import { getTypeFromLocation } from '../../../utils/functions';
import { API_ROOT, API_KEY, API_ACTORS_IMAGES } from '../../../constants/api';

import style from './photos.module.scss';

const Photos = () => {
  const [results, setResults] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [initialSlide, setInitialSlide] = useState(null);

  const { id } = useParams();
  const { pathname } = useLocation();

  const url = `${API_ROOT}${getTypeFromLocation(pathname)}/${id}${API_ACTORS_IMAGES}${API_KEY}`;

  useEffect(() => {
    (async() => {
      const res = await getApiResources(url);
      return res ? setResults(res) : null;
    })();
  }, [url]);

  return (
    <>
      {showGallery
        ? <PhotoGallery 
            results={results} 
            initial={initialSlide}
            setShowGallery={setShowGallery}
          />
        : <>
            {results
              ? <ul className={style.list}>
                  {results.profiles.map(({file_path}, i) => (
                    <li 
                      key={i}
                      onClick={() => {
                        setShowGallery(true);
                        setInitialSlide(i);
                      }}
                    >
                      <Backdrop path={file_path} actor light />
                    </li>
                  ))}
                </ul>
              : <ShimmerPhotos />
            }
          </>
        }
    </>
  );
}

export default Photos;