import MusicCard from '@/components/others/MusicCard/Index.js';
import Discover from '@/view/container/Discover/Index.js';
import ImageCard from '@/components/others/ImageCard/Index.js';
import ModuleCard from '@/components/others/ModuleCard/Index.js';
import VirtualList from '@/components/others/VirtualList/Index.js';
import styles from './Test.module.scss';
const Test = () => {
  return (
    <div className={styles._box}>
      <VirtualList />
    </div>
  )
};
export default Test;