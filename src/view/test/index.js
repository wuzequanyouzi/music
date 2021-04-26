import MusicCard from '@/components/others/MusicCard/Index.js';
import Discover from '@/view/Discover/Index.js';
import ImageCard from '@/components/others/ImageCard/Index.js';
import ModuleCard from '@/components/others/ModuleCard/Index.js';
import styles from './Test.module.scss';
const Test = () => {
  return (
    <div className={styles._box}>
      {/* <Discover /> */}
      <ModuleCard >
        <div className={styles.box}>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
              return (
                <div className={styles.image}>
                  <ImageCard />
                </div>
              )
            })
          }
        </div>
      </ModuleCard>
    </div>
  )
};
export default Test;