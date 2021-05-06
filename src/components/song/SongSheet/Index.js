// 依赖
import {
  useState,
  useEffect,
  useRef
} from 'react';
import { useHistory } from 'react-router';
import SongSheetDisplayArea from '../SongSheetDisplayArea/Index.js';

import SongList from '@/components/song/SongList/Index.js';

// 样式
import styles from './SongSheet.module.scss';
import p1 from '@/assets/images/1.jpg';

import { SongService } from '@/api/index.js';

const SongSheet = () => {
  const history = useHistory();
  // 歌单信息
  const [songSheet, setSongSheet] = useState({});

  // 歌曲列表
  const [songList, setSongList] = useState([]);
  useEffect(() => {
    if (!history.location.params) return;
    const id = history.location.params.split('=')[1];
    console.log(id);
    SongService.getSongSheetDetail({
      id
    }).then(data => {
      console.log(data);
      setSongSheet(data.playlist)
      const ids = data.playlist.trackIds.map(trackId => {
        return trackId.id;
      }).join(',');
      SongService.getSongDetail({
        ids
      }).then(data => {
        console.log(data);
        setSongList(data.songs);
      })
    })
  }, [history.location.params]);
  return (
    songSheet.name
      ?
      <div className={styles.song_sheet}>
        <div className={styles.song_sheet_info}>
          <img className={styles.song_sheet_info_left} src={songSheet.coverImgUrl || p1} />
          <div className={styles.song_sheet_info_right}>
            <div className={styles.title_box}>
              <span className={styles.tilte_icon}>歌单</span>
              <span className={styles.title}>{songSheet.name}</span>
            </div>
            <div className={styles.author_box}>
              <img className={styles.author_img} src={songSheet.creator.avatarUrl || p1} alt="" />
              <span className={styles.author_name}>{songSheet.creator.nickname}</span>
              <span className={styles.author_created_time}>{songSheet.createTime} 创建</span>
            </div>
            <div className={styles.options_box}>
              <div className={styles.play_all_box}>
                <span className={styles.play_all}><i className={`${styles.play_icon} iconfont icon-play`}></i>播放全部</span>
                <span className={styles.add_play_list}>+</span>
              </div>
              <div className={styles.collection}>
                <span><i className={`${styles.play_icon} iconfont icon-play`}></i>收藏({songSheet.subscribedCount})</span>
              </div>
              <div className={styles.share}>
                <span><i className={`${styles.play_icon} iconfont icon-play`}></i>分享({songSheet.shareCount})</span>
              </div>
              <div className={styles.download_all}>
                <span><i className={`${styles.play_icon} iconfont icon-play`}></i>下载全部</span>
              </div>
            </div>
            <div className={styles.info_box}>
              <div className={styles.target_box}>
                <span>标签 : </span>
                {
                  songSheet.tags.map((tag, index) => {
                    if (index === songSheet.tags.length - 1) {
                      return (
                        <span key={index}>{tag}</span>
                      )
                    }
                    return (
                      <span key={index}>
                        <span>{tag}</span><span> / </span>
                      </span>
                    )
                  })
                }
              </div>
              <div className={styles.song_sheet_total}>
                <span><span>歌曲 : </span><span>{songSheet.trackCount}</span></span>
                <span style={{ marginLeft: '20px' }}><span>播放 : </span><span>{songSheet.playCount}</span></span>
              </div>
              <div className={styles.introduction}>
                <span>简介 : </span>
                {/* <pre className={styles.description}>{songSheet.description}</pre> */}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.display_area}>
          <SongSheetDisplayArea songList={songList} />
        </div>
      </div>
      : ''
  );
};

export default SongSheet;