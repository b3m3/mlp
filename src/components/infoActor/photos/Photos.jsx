import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { getApiResources } from '../../../service/getApiResources';
import { getTypeFromLocation } from '../../../utils/functions';
import { API_ROOT, API_KEY, API_ACTORS_IMAGES, API_IMAGE_ORIGINAL } from '../../../constans/api';
import ShimmerPhotos from '../../ui/shimmers/shimmerPhotos/ShimmerPhotos';
import Backdrop from '../../ui/backdrop/Backdrop';

import style from './photos.module.scss';

const Photos = () => {
  const [results, setResults] = useState(null);

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
      {results
        ? <ul className={style.list}>
            {results.profiles.map(({file_path}, i) => (
              <li key={file_path}>
                <a href={API_IMAGE_ORIGINAL+file_path} target={'_blank'} rel="noreferrer">
                  <Backdrop path={file_path} actor />
                </a>
              </li>
            ))}
          </ul>
        : <ShimmerPhotos />
      }
    </>
  );
}

export default Photos;