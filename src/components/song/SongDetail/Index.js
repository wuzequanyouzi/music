import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';

import styles from './SongDetail.module.scss';
const SongDetail = (props) => {
  const {
    isShow = false
  } = props;
  const lrcDom = useRef(null);
  const lrcInfo = useSelector(state => state.SONG_INFO.songLyricInfo);
  window.lrcDom = lrcDom;
  return createPortal(
    <div
      className={`${styles.songDetail} ${isShow && styles.show}`}
    >
      <div className={styles.top}>
        <div className={styles.left}></div>
        <div
          className={styles.center}
          ref={lrcDom}
        >
          {
            lrcInfo.lrcArray?.length > 0 &&
            lrcInfo.lrcArray.map(lrc => {
              return (
                <p
                  key={lrc.time}
                >{lrc.words}</p>
              )
            })
          }
        </div>
        <div className={styles.right}></div>
      </div>
      <div className={styles.bottom}>

      </div>
    </div>,
    document.body
  )
};

export default SongDetail;