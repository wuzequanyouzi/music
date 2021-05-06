// 依赖
import { useState, useEffect } from 'react';
import {
  useHistory
} from "react-router-dom";

// 组件
import Carousel from '@/components/others/Carousel/Index.js';
import ImageCard from '@/components/others/ImageCard/Index.js';
import ModuleCard from '@/components/others/ModuleCard/Index.js';

// 样式or图片
import styles from './Discover.module.scss';

// js
import { HomePageService, RecommendService, SongService } from '@/api/index.js';
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
  const history = useHistory();
  const [activeHeaderItem, setActiveHeaderItem] = useState('个性推荐');
  const handleClickHeaderItem = (headerItem) => {
    setActiveHeaderItem(headerItem.name);
  };

  // 轮播图列表
  const [carouselImages, setCarouselImages] = useState([]);

  // 推荐歌单
  const [personalized, setPersonalized] = useState([]);

  window.carouselImages = carouselImages;
  useEffect(() => {
    HomePageService.getDiscover()
      .then(data => {
        const images = data.blocks[0]?.extInfo?.banners || [];
        console.log(data);
        setCarouselImages([...images]);
      });

    RecommendService.getPersonalized(10)
      .then(data => {
        setPersonalized(data);
      })
  }, []);

  // 点击推荐歌单
  const handleClickSongSheet = (songSheet) => {
    history.push({
      pathname: '/songSheet',
      params: `id=${songSheet.id}`
    });
  };

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
              personalized.map(item => {
                return (
                  <div key={item.id} className={styles.image} onClick={() => handleClickSongSheet(item)}>
                    <ImageCard imageInfo={item} />
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