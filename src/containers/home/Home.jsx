import { useState, useEffect } from 'react';

import style from './home.module.scss';

const Home = () => {
  const [results, setResults] = useState(null);

  useEffect(() => {
  }, []);

  return (
    <section className={style.home}>
      <h2>Home page</h2>
    </section>
  );
}

export default Home;