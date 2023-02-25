import { getTitleLang } from '../../../utils/functions';

import style from './episodes-buttons.module.scss';

const names = [
  {en: 'Episode', uk: 'Серія', ru: 'Серия'}
]

const EpisodesButtons = ({ number, language, episodeNumber, setEpisodeNumber }) => {
  const name = getTitleLang(names, language);
  
  return (
    <ul className={style.wrapp}>
      {number && [...Array(number)].map((_, i) => (
        <li key={i}>
          <button
            onClick={() => setEpisodeNumber(i)}
            style={episodeNumber === i ? {background: '#ffffff4d'} : null}
          >
            {name} {i +1}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default EpisodesButtons;