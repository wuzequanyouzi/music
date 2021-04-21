import styles from './Discover.module.scss';
import { useState } from 'react';
import { HomePageService } from '@/api/index.js';
const HEADER_LIST = [
  {
    name: '个性推荐'
  },
  {
    name: '歌单'
  },
  {
    name: '主播电台'
  },
  {
    name: '排行榜'
  },
  {
    name: '歌手'
  },
  {
    name: '最新音乐'
  },
]
const Discover = (props) => {
  const [activeHeaderItem, setActiveHeaderItem] = useState('个性推荐');
  const handleClickHeaderItem = (headerItem) => {
    setActiveHeaderItem(headerItem.name);
  };
  HomePageService.getDiscover()
    .then(data => {
      console.log(data);
    })
  return (
    <div className={styles.discover}>
      <header className={styles.header}>
        {
          HEADER_LIST.map(headerItem => (
            <p
              key={headerItem.name}
              className={`${styles.header_item} ${activeHeaderItem === headerItem.name ? styles.active_header_item : ''}`}
              onClick={() => handleClickHeaderItem(headerItem)}
            >{headerItem.name}</p>
          ))
        }
      </header>
    </div>
  )
};

export default Discover;