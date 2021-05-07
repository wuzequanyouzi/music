import { useState, useEffect, useRef } from 'react';
import ReactDom from 'react-dom';
import { useStore, useDispatch } from 'react-redux';
import { CURRENT_PLAYING_SONG, SONG_LYRIC_INFO } from '@/store/type/song.js';
import { SongService } from '@/api';

import styles from './ContextMenu.module.scss';

const ContextMenu = (props) => {
  const {
    className,
    isShow = false,
    left = 0,
    top = 0,
    songInfo,
    grandref
  } = props;
  const [isInSheet, setIsInSheet] = useState(false);
  const [_songInfo, setSongInfo] = useState(songInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    setSongInfo(songInfo);
  }, [songInfo]);

  const handleClickPlay = () => {
    dispatch({
      type: CURRENT_PLAYING_SONG,
      currentPlayingSong: _songInfo.songInfo
    });
    SongService.getSongLyric({
      id: _songInfo.songInfo.id
    }).then(data => {
      console.log(data);
      dispatch({
        type: SONG_LYRIC_INFO,
        songLyricInfo: data
      });
    })
  }
  return (
    ReactDom.createPortal(
      <div
        ref={grandref}
        className={`${className} ${styles.context_menu} ${!isShow && styles.isNotShow}`}
        style={{ left, top }}
      >
        <div className={styles.up}>
          <div className={styles.view_comments}>
            <i className={`iconfont icon-pinglun ${styles.icon}`}></i>
            <span>查看评论(889)</span>
          </div>
          <div className={styles.play} onClick={handleClickPlay}>
            <i className={`iconfont icon-play1 ${styles.icon}`}></i>
            <span>播放</span>
          </div>
          <div className={styles.nextsong}>
            <i className={`iconfont icon-nextsong ${styles.icon}`}></i>
            <span>下一首播放</span>
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.collected}>
            <i className={`iconfont icon-collected ${styles.icon}`}></i>
            <span>收藏到歌单</span>
          </div>
          <div className={styles.link}>
            <i className={`iconfont icon-link ${styles.icon}`}></i>
            <span>复制链接</span>
          </div>
          <div className={styles.download}>
            <i className={`iconfont icon-download ${styles.icon}`}></i>
            <span>下载</span>
          </div>
        </div>
        <div className={styles.down}>
          {
            isInSheet
              ?
              <div>
                <i className={`iconfont icon-delete ${styles.icon}`}></i>
                <span>从歌单中删除</span>
              </div>
              : ''
          }
        </div>
      </div>,
      document.body)
  );
};

export default ContextMenu;