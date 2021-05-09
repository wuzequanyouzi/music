import { useState, useEffect, useRef } from 'react';
import styles from './Lyric.module.scss';

const { ipcRenderer } = window.require('electron');

const Lyric = () => {
  const [currentLyricWords, setCurrentLyricWords] = useState('网易云音乐');
  const [lrcInfo, setLrcInfo] = useState({});
  const [fontSize, setFontSize] = useState('1.4em');

  // 移动标志位
  const [grabbing, setGrabbing] = useState(false);

  const updateLrcRef = useRef(null);

  // 歌词Dom
  const lrcDomRef = useRef(null);

  // 只在第一次加载的时候绑定监听事件
  useEffect(() => {
    // 保存歌词信息，由于两个页面，store没有共存（后面再寻找其他存储方法）
    ipcRenderer.on('save-lrc-info', (event, _lrcInfo) => {
      console.log(_lrcInfo);
      setLrcInfo(_lrcInfo);
    });

    // 歌词更新
    ipcRenderer.on('update-lrc-words', (event, time) => {
      updateLrcRef.current(event, time);
    });

    // 监听页面大小改变
    const handlerSizeChange = () => {
      console.log(lrcDomRef.current.offsetHeight);
      const emValue = ((lrcDomRef.current.offsetHeight / 40) * (lrcDomRef.current.offsetHeight / 80 * 0.9)).toFixed(2);
      setFontSize(emValue + 'em');
    };
    window.addEventListener('resize', handlerSizeChange);
    return () => {
      window.removeEventListener('resize', handlerSizeChange);
    }
  }, []);

  useEffect(() => {
    updateLrcRef.current = (event, time) => {
      let currentIndex = 0;
      for (let index = 0; index < lrcInfo.lrcArray.length; index++) {
        const lrc = lrcInfo.lrcArray[index];
        if (time < lrc.time) {
          currentIndex = index - 1;
          break;
        }
        currentIndex = index;
      }
      if (!isNaN(lrcInfo.lrcArray[currentIndex].time) && currentLyricWords !== lrcInfo.lrcArray[currentIndex].words) {
        setCurrentLyricWords(lrcInfo.lrcArray[currentIndex].words);
      } else {
        setCurrentLyricWords('网易云音乐');
      }
    }
  }, [lrcInfo]);

  // 点击时可以拖拽
  const handleMouseDownPage = () => {
    setGrabbing(true);
    ipcRenderer.send('drag', true);
  };
  const handleMouseUpPage = () => {
    setGrabbing(false);
    ipcRenderer.send('drag', false);
  };
  return (
    <div
      className={`${styles.lyric} ${grabbing ? styles.grabbing : ''}`}
      onMouseDown={handleMouseDownPage}
      onMouseUp={handleMouseUpPage}
      ref={lrcDomRef}
    >
      <div className={styles.options}>top</div>
      <div
        className={styles.lyric_container}
      >
        {/* <div
          className={styles.other_lang}
          style={{ fontSize: fontSize }}
        >{currentLyricWords}</div> */}
        <div
          style={{ fontSize: fontSize }}
          className={styles.zh_cn}
        >{currentLyricWords}</div>
      </div>
    </div>
  )
};

export default Lyric;