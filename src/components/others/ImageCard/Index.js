import { useState, useRef, useEffect } from 'react';

// 样式or图片
import styles from './ImageCard.module.scss';
import p1 from '@/assets/images/1.jpg';

const ImageCard = (props) => {
  const {
    imageInfo = {}
  } = props;

  return (
    <div className={styles.image_card}>
      <img className={styles.image_container} src={p1} />
      <img className={styles.left_top} />
      <div className={styles.right_top}>{'你叉叉'}</div>
      <div className={styles.left_bottom}>{'你叉叉'}</div>
      <div className={styles.right_bottom}>{'你叉叉'}</div>
      <div className={styles.footer}>
        <span className={styles.title}>[你XX你XX]</span>
        你XX你XX你XX你XX你XX你XX你XX你XX你XX你XX你XX你XX你你XX你你XX你你XX你XX你XX你XX你XX你XX你XX你XX你XX你XX你XX你XX你XX
      </div>
    </div>
  )
};

export default ImageCard;