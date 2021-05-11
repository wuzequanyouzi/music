import { useState, useRef, useEffect } from 'react';
import PlayButton from '@/components/others/PlayButton/Index';

// 样式or图片
import styles from './ImageCard.module.scss';
import p1 from '@/assets/images/1.jpg';

const ImageCard = (props) => {
  const {
    imageInfo = {},
    showPlayBtn = true
  } = props;

  const [_imageInfo, setImageInfo] = useState(imageInfo);
  useEffect(() => {
    setImageInfo(imageInfo);
  }, [imageInfo])

  return (
    <div className={styles.image_card}>
      <div className={styles.hover}>
        <div className={styles.image_container}>
          <img className={styles.img} src={_imageInfo.picUrl || p1} />
          <div className={styles.icon_container}>
            <img className={styles.left_top} />
            <div className={styles.right_top}>{'你叉叉'}</div>
            <div className={styles.left_bottom}>{'你叉叉'}</div>
            <div className={styles.right_bottom}>{'你叉叉'}</div>
            {showPlayBtn && (<PlayButton className={styles.play_btn} />)}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        {/* <span className={styles.title}>[你XX你XX]</span> */}
        {_imageInfo.name}
      </div>
    </div>
  )
};

export default ImageCard;