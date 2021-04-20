import { Image } from 'antd';
import styles from './MusicCard.module.scss';
const MusicCard = (props) => {
  const { className } = props;
  return (
    <div className={[styles.music_card, className].join(' ')}>
      <Image
        className={styles.img}
        preview={false}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />

    </div>
  )
}

export default MusicCard;