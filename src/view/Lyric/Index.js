import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import styles from './Lyric.module.scss';

const Lyric = () => {
  const [currentLyricWords, setCurrentLyricWords] = useState('');
  const lrcInfo = useSelector(state => state.SONG_INFO.songLyricInfo);
  useEffect(() => {
    console.log(lrcInfo);
  }, [lrcInfo]);
  return (
    <div className={styles.lyric}>
      <div className={styles.options}>top</div>
      <div className={styles.lyric_container}>歌词</div>
    </div>
  )
};

export default Lyric;