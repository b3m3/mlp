import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useFetching } from '../../../hooks/useFetching';

import ShimmerPhotos from '../../ui/shimmers/shimmerPhotos/ShimmerPhotos';
import Backdrop from '../../ui/backdrop/Backdrop';
import PhotoGallery from '../photoGallery/PhotoGallery';
import { getTypeFromLocation } from '../../../utils/functions';
import { API_ROOT, API_KEY, API_ACTORS_IMAGES } from '../../../constants/api';

import style from './photos.module.scss';

const Photos = () => {
  const [showGallery, setShowGallery] = useState(false);
  const [initialSlide, setInitialSlide] = useState(null);

  const { id } = useParams();
  const { pathname } = useLocation();

  const url = `${API_ROOT}${getTypeFromLocation(pathname)}/${id}${API_ACTORS_IMAGES}${API_KEY}`;

  const { results } = useFetching(url);

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