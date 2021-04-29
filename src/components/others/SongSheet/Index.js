// 依赖
import {
  useState,
  useEffect,
  useRef
} from 'react';

// 样式
import styles from './SongSheet.module.scss';
import p1 from '@/assets/images/1.jpg';

const SongSheet = () => {
  return (
    <div className={styles.song_sheet}>
      <div className={styles.song_sheet_info}>
        <img className={styles.song_sheet_info_left} src={p1} />
        <div className={styles.song_sheet_info_right}>
          <div className={styles.title_box}>
            <span className={styles.tilte_icon}>歌单</span>
            <span className={styles.title}>把喜欢藏进波子汽水泡泡里♡﻿咕咚喝掉！</span>
          </div>
          <div className={styles.author_box}>
            <img className={styles.author_img} src={p1} alt="" />
            <span className={styles.author_name}>把喜欢藏进波子汽水泡泡里♡﻿咕咚喝掉！</span>
            <span className={styles.author_created_time}>2021-04-27 创建</span>
          </div>
          <div className={styles.options_box}>
            <div className={styles.play_all_box}>
              <span className={styles.play_all}><i className={`${styles.play_icon} iconfont icon-play`}></i>播放全部</span>
              <span className={styles.add_play_list}>+</span>
            </div>
            <div className={styles.collection}>
              <span><i className={`${styles.play_icon} iconfont icon-play`}></i>收藏(3710)</span>
            </div>
            <div className={styles.share}>
              <span><i className={`${styles.play_icon} iconfont icon-play`}></i>分享(3710)</span>
            </div>
            <div className={styles.download_all}>
              <span><i className={`${styles.play_icon} iconfont icon-play`}></i>下载全部</span>
            </div>
          </div>
          <div className={styles.info_box}>
            <div className={styles.target_box}>
              <span>标签 : </span>
              <span>华语</span>
            </div>
            <div className={styles.song_sheet_total}>
              <span><span>歌曲 : </span><span>46</span></span>
              <span style={{ marginLeft: '20px' }}><span>播放 : </span><span>58万</span></span>
            </div>
            <div className={styles.introduction}>
              <span>简介 : </span>
              sadasdasdasdasdasdasds<br></br>asdasdasd
            </div>
          </div>
        </div>
      </div>
      <div className={styles.song_list}>

      </div>
    </div>
  );
};

export default SongSheet;