import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getApiResources } from '../../service/getApiResources';
import Card from '../card/Card';

import style from './preview.module.scss';

const Preview = ({ title, url }) => {
  const [results, setResults] = useState(null);
  const [errorApi, setErrorApi] = useState(false);

  const getResults = async url => {
    const res = await getApiResources(url);
    if (res) {
      setResults(res.results);
    } else {
      setErrorApi(true);
    }
  };

  useEffect(() => {
    getResults(url);
  }, [url]);

  return (
    <div className={style.preview}>
      <div className={style.top}>
        <h2>{title}</h2>
        <Link to={''}>
          See all
        </Link>
      </div>
      
      {errorApi
        ? <h2>Error</h2>
        : <ul>
            {results && results.map(props => (
              <Card 
                key={props.id}
                {...props}
              />
            ))}
          </ul>}
    </div>
  );
}

export default Preview;