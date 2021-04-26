import { useState, useRef, useEffect } from 'react';

// 样式or图片
import styles from './ImageCard.module.scss';
import p1 from '@/assets/images/1.jpg';

const ImageCard = (props) => {
  const {
    imageInfo = {},
    showPlayBtn = true
  } = props;

  return (
    <div className={styles.image_card}>
      <div className={styles.hover}>
        <div className={styles.image_container}>
          <img className={styles.img} src={p1} />
        </div>
        <div className={styles.icon_container}>
          <img className={styles.left_top} />
          <div className={styles.right_top}>{'你叉叉'}</div>
          <div className={styles.left_bottom}>{'你叉叉'}</div>
          <div className={styles.right_bottom}>{'你叉叉'}</div>
          {showPlayBtn && (<div className={styles.play_btn}>
            <i className={'iconfont icon-musicplay1'} style={{ fontSize: '30px', color: '#EEE' }}></i>
          </div>)}
        </div>
      </div>
      <div className={styles.footer}>
        <span className={styles.title}>[你XX你XX]</span>
        你XX你XX你XX你XX你XX你XX你XX你XX你XX你XX你XX你XX你你XX你你XX你你XX你XX你XX你XX你XX你XX你XX你XX你XX你XX你XX你XX你XX
      </div>
    </div>
  )
};

export default ImageCard;