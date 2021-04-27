import { useState, useEffect } from 'react';

import styles from './Footer.module.scss';
import p1 from '@/assets/images/1.jpg';

const Footer = (props) => {
  const [collected, setCollecte] = useState(false);
  const [isVipSong, setIsVipSong] = useState(false);
  return (
    <div className={styles.footer}>
      <div className={styles.left}>
        <div className={styles.translate}>
          <div className={styles.up}>
            <img className={styles.pic_img} src={p1} />
            <div className={styles.song_info}>
              <div className={styles.song_name}>
                <span>{'River Flows In You'}</span>
                {isVipSong && <div className={styles.vip}>VIP</div>}
                <i className={`iconfont ${styles.collected} ${collected ? 'icon-collected' : 'icon-notcollected'}`}></i>
              </div>
              <div className={styles.song_author}>
                <span>{'River Flows In You'}</span>
              </div>
            </div>
          </div>
          <div className={styles.down}>
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
          <div className={`iconfont icon-play ${styles.play} ${styles.center_option}`}></div>
          <div className={`iconfont icon-next_song ${styles.next_song} ${styles.center_option}`}></div>
          <div className={`iconfont ${styles.lyric} ${styles.center_option}`}></div>
        </div>
        <div className={styles.center_down}>
          <audio autoPlay src="../../../../public/mp3/無限人數-海墘個孥仔.MP3"></audio>
        </div>
      </div>
      <div className={styles.right}></div>
    </div>
  )
};

export default Footer;