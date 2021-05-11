import { useState, useEffect } from 'react';
import PlayButton from '@/components/others/PlayButton/Index';
import Tag from '@/components/others/Tag/Index';

import styles from './SongItem.module.scss';
const SongItem = (props) => {
  const {
    songInfo = {}
  } = props;

  return (
    <div className={styles.song_item}>
      <div className={styles.song_pic_box}>
        <img className={styles.song_pic} src={songInfo.album.picUrl} alt={`${songInfo.album.type}:${songInfo.album.name}`} />
        <div className={styles.mark_box}>
          <PlayButton iconfontsize='24px' />
        </div>
      </div>
      <div className={styles.song_infobox}>
        <div className={styles.song_title}>
          <span>{songInfo.name}</span>
          <span>{songInfo.alias}</span>
        </div>
        <div className={styles.song_author_box}>
          {songInfo.privilege.maxbr > 320000 && <Tag label='SQ' />}
          {songInfo.moid !== 0 && <Tag label='MV' />}
          <div>{songInfo.artists.map(artist => artist.name).join('/')}</div>
        </div>
      </div>
    </div>
  )
};

export default SongItem;