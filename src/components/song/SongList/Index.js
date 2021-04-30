import { useState, useEffect, useRef } from 'react';
import ContextMenu from '../ContextMenu/Index.js';

import styles from './SongList.module.scss';

const SongList = () => {
  return (
    <div className={styles.song_list_box}>
      <ContextMenu />
    </div>
  )
};

export default SongList;