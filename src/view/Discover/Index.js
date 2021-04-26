// 依赖
import { useState, useEffect } from 'react';

// 组件
import Carousel from '@/components/others/Carousel/Index.js';
import ImageCard from '@/components/others/ImageCard/Index.js';
import ModuleCard from '@/components/others/ModuleCard/Index.js';

// 样式or图片
import styles from './Discover.module.scss';

// js
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

  // 轮播图列表
  const [carouselImages, setCarouselImages] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  window.carouselImages = carouselImages;
  useEffect(() => {
    setisLoading(false);
    HomePageService.getDiscover()
      .then(data => {
        const images = data.blocks[0]?.extInfo?.banners || [];
        setCarouselImages([...images]);
      })
  }, [isLoading]);

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
      <div className={styles.container}>
        <Carousel className={styles.carousel} autoplay={true} delayTime={4000} imageList={carouselImages} />
        {/* 推荐 */}
        <ModuleCard >
          <div className={styles.image_box}>
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
                return (
                  <div key={item} className={styles.image}>
                    <ImageCard />
                  </div>
                )
              })
            }
          </div>
        </ModuleCard>
      </div>
    </div>
  )
};

export default Discover;