import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { onActiveInfo } from '../../store/slices/infoSlice';
import { API_TV_SHOWS } from '../../constants/api';

import Back from '../../components/ui/back/Back';
import Seasons from '../../components/smart/seasons/Seasons';
import SeasonNumber from '../../components/smart/seasonNumber/SeasonNumber';
import Background from '../../components/ui/background/Background';

import style from './info-seasons.module.scss';

const InfoSeasons = () => {
  const [background, setBackground] = useState(null);
  const [episodeNumber, setEpisodeNumber] = useState(0);

  const language = useSelector(state => state.language.language);
  const infoState = useSelector(state => state.info.infoState);
  const dispatch = useDispatch();

  const { id } = useParams();
  const refSeasons = useRef(null);

  useEffect(() => {
    dispatch(onActiveInfo());
  }, [dispatch, infoState]);

  return (
    <section className={style.wrapp}>
      <Background path={background} />
      <Back path={`/${language}${API_TV_SHOWS}/${id}`} />

      <div className={style.body}>
        <div className={style.col}>
          <SeasonNumber
            id={id}
            language={language}
            episodeNumber={episodeNumber}
            setEpisodeNumber={setEpisodeNumber}
            refSeasons={refSeasons}
          />
        </div>
        <div className={style.col}>
          <Seasons
            id={id}
            language={language}
            setBackground={setBackground}
            setEpisodeNumber={setEpisodeNumber}
            ref={refSeasons}
          />
        </div>
      </div>
    </section>
  );
}

export default InfoSeasons;