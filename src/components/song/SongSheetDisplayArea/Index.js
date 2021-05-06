import { useState, useEffect } from 'react';
import SongList from '../SongList/Index.js';

import styles from './SongSheetDisplayArea.module.scss';

const SongSheetDisplayArea = () => {
  return (
    <div className={styles.box}>
      <div className={styles.tab}>
        <span className={`${styles.song_list} ${styles.active_tab}`}>歌曲列表</span>
        <span className={styles.comments}>评论(222)</span>
        <span className={styles.collectors}>收藏者</span>
      </div>
      <div className={styles.container}>
        <SongList />
      </div>
    </div>
  );
};

export default SongSheetDisplayArea;