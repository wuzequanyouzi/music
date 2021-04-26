import MusicCard from '@/components/others/MusicCard/Index.js';
import Discover from '@/view/Discover/Index.js';
import ImageCard from '@/components/others/ImageCard/Index.js';
import styles from './Test.module.scss';
const Test = () => {
  return (
    <div>
      {/* <Discover /> */}
      <div className={styles.image}>
        <ImageCard />
      </div>
    </div>
  )
};
export default Test;