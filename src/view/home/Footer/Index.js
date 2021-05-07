import { useState, useEffect, useRef } from 'react';
import { useStore, useSelector } from 'react-redux';
import { SongService } from '@/api';

// 歌曲详情
import SongDetail from '@/components/song/SongDetail/Index.js';

import styles from './Footer.module.scss';
import p1 from '@/assets/images/1.jpg';

// 格式化时间00:00
const formatTime = (time) => {
  const _duration = Math.round(time);
  const minute = parseInt(_duration / 60);
  const second = _duration % 60;
  const resultTime = `${(Array(2).join(0) + minute).slice(-2)}:${(Array(2).join(0) + second).slice(-2)}`;
  return resultTime;
}

const Footer = (props) => {
  const store = useStore();
  const state = store.getState();
  const [collected, setCollecte] = useState(false);
  const [isVipSong, setIsVipSong] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSongDetail, setShowSongDetail] = useState(false);
  const [currentPlayingSong, setCurrentPlayingSong] = useState(state.SONG_INFO.currentPlayingSong);
  const [currentPlayingSongMp3Info, setCurrentPlayingSongMp3Info] = useState({});
  const [musicDuration, setMusicDuration] = useState('00:00');
  const [currentMusicDuration, setCurrentMusicDuration] = useState('00:00');
  const audioDom = useRef(null);
  const currentProgressBar = useRef(null);

  const currentSongInfo = useSelector(state => state.SONG_INFO.currentPlayingSong);

  // 当前播放的歌曲信息变化，先停止播放
  useEffect(() => {
    console.log(currentSongInfo.id, currentPlayingSong.id, currentSongInfo.id !== currentPlayingSong.id);
    if (currentSongInfo.id && currentSongInfo.id !== currentPlayingSong.id) {
      setCurrentPlayingSong(currentSongInfo);
      audioDom.current.pause();
    }
  }, [currentSongInfo]);

  // 获取变化后的歌曲的播放url
  useEffect(() => {
    if (!currentPlayingSong.id) return;
    SongService.getSongMp3Url({
      id: currentPlayingSong.id
    }).then(data => {
      setCurrentPlayingSongMp3Info(data[0]);
    })
  }, [currentPlayingSong]);

  useEffect(() => {
    console.log(currentPlayingSongMp3Info);
    if (currentPlayingSongMp3Info.url) {
      audioDom.current.play();
      setIsPlaying(true);
    }
  }, [currentPlayingSongMp3Info]);

  // 获取音乐时长
  const getMusicDuration = () => {
    const _musicDuration = formatTime(audioDom.current.duration);
    setMusicDuration(_musicDuration);
  };

  // 获取音乐播放实时时间
  const getMusicCurrentDuration = () => {
    const _currentDuration = formatTime(audioDom.current.currentTime);
    if (audioDom.current.currentTime >= audioDom.current.duration) {
      currentProgressBar.current.style.width = '100%';
    } else {
      const width = Math.round(currentProgressBar.current.parentNode.offsetWidth * (audioDom.current.currentTime / audioDom.current.duration));
      currentProgressBar.current.style.width = `${width}px`;
    }
    setCurrentMusicDuration(_currentDuration);
  };

  // 播放暂停按钮点击事件回调
  const handleClickPlay = () => {
    const _isPlaying = !isPlaying;
    if (_isPlaying) {
      audioDom.current.play()
    } else {
      audioDom.current.pause()
    }

    setIsPlaying(_isPlaying);
  };

  const handleClickShowSongDetail = () => {
    setShowSongDetail(true);
  };
  const handleClickHideSongDetail = () => {
    setShowSongDetail(false);
  }

  return (
    <div className={styles.footer}>
      <SongDetail isShow={showSongDetail} />
      <div className={styles.left}>
        <div className={`${styles.translate} ${showSongDetail && styles.translate_show}`}>
          <div
            className={styles.up}
            onClick={handleClickShowSongDetail}
          >
            <img className={styles.pic_img} src={currentPlayingSong?.al?.picUrl} />
            <div className={styles.song_info}>
              <div className={styles.song_name}>
                <span>{currentPlayingSong.name}</span>
                {isVipSong && <div className={styles.vip}>VIP</div>}
                <i className={`iconfont ${styles.collected} ${collected ? 'icon-collected' : 'icon-notcollected'}`}></i>
              </div>
              <div className={styles.song_author}>
                <span>{currentPlayingSong?.ar?.map(arItem => arItem.name).join('/')}</span>
              </div>
            </div>
          </div>
          <div
            className={styles.down}
            onClick={handleClickHideSongDetail}
          >
            <div className={styles.option}>
              <i className={`iconfont ${styles.collected} ${collected ? 'icon-collected' : 'icon-notcollected'}`}></i>
            </div>
            <div className={styles.option}>
              <i className={`iconfont ${styles.collected} ${collected ? 'icon-collected' : 'icon-notcollected'}`}></i>
            </div>
            <div className={styles.option}>
              <i className={`iconfont ${styles.collected} ${!collected ? 'icon-collected' : 'icon-notcollected'}`}></i>
            </div>
            <div className={styles.option}>
              <i className={`iconfont ${styles.collected} ${!collected ? 'icon-collected' : 'icon-notcollected'}`}></i>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.center_up}>
          <div className={`iconfont ${styles.mode} ${styles.center_option}`}></div>
          <div className={`iconfont icon-last_song ${styles.last_song} ${styles.center_option}`}></div>
          <div
            className={`iconfont ${isPlaying ? 'icon-pause' : 'icon-play'} ${styles.play} ${styles.center_option}`}
            onClick={handleClickPlay}
          ></div>
          <div className={`iconfont icon-next_song ${styles.next_song} ${styles.center_option}`}></div>
          <div className={`iconfont ${styles.lyric} ${styles.center_option}`}></div>
        </div>
        <div className={styles.center_down}>
          <div className={styles.song_audio}>
            <span className={styles.timer}>{currentMusicDuration}</span>
            <div className={styles.progress_bar}>
              <div ref={currentProgressBar} className={styles.progress_bar_current}></div>
            </div>
            <span className={styles.timer}>{musicDuration}</span>
            <audio
              ref={audioDom}
              src={currentPlayingSongMp3Info?.url}
              onCanPlay={getMusicDuration}
              onTimeUpdate={getMusicCurrentDuration}
            ></audio>
          </div>
        </div>
      </div>
      <div className={styles.right}></div>
    </div>
  )
};

export default Footer;