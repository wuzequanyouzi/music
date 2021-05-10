// 依赖
import { useState, useEffect } from 'react';
import {
  useHistory
} from "react-router-dom";

// 组件
import Carousel from '@/components/others/Carousel/Index.js';
import ImageCard from '@/components/others/ImageCard/Index.js';
import ModuleCard from '@/components/others/ModuleCard/Index.js';

// 公共
import { regionMap } from '@/config/constant.js';

// 样式or图片
import styles from './Discover.module.scss';

// js
import {
  HomePageService,
  RecommendService,
  SongService,
  PrivatecontentService,
  PersonalizedService,
  TopService
} from '@/api/index.js';
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

  // 独家放送（入口列表）
  const [privatecontent, setPrivatecontent] = useState([]);

  // 推荐MV
  const [personalizedMV, setPersonalizedMV] = useState([]);

  // 最新音乐
  const [newMusic, setNewMusic] = useState([]);

  window.carouselImages = carouselImages;
  useEffect(() => {

    // 获取轮播列表
    HomePageService.getDiscover()
      .then(data => {
        const images = data.blocks[0]?.extInfo?.banners || [];
        setCarouselImages([...images]);
      });

    // 推荐歌单列表
    RecommendService.getPersonalized(10)
      .then(data => {
        setPersonalized(data);
      });

    // 独家放送（入口列表）
    PrivatecontentService.getPrivatecontent()
      .then(data => {
        setPrivatecontent(data);
      });

    // 推荐MV
    PersonalizedService.getPersonalizedMv()
      .then(data => {
        setPersonalizedMV(data);
      });

    // 新歌速递（最新音乐）
    TopService.getNewMusics({
      type: regionMap.全部
    }).then(data => {
      setNewMusic(data.slice(0, 12));
    })
  }, []);

  // 点击推荐歌单
  const handleClickSongSheet = (songSheet) => {
    history.push({
      pathname: '/home/songSheet',
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
      <div className={styles.container_box}>
        <div className={styles.container}>
          <Carousel className={styles.carousel} autoplay={true} delayTime={4000} imageList={carouselImages} />
          {/* 推荐 */}
          <ModuleCard
            headerTitle="推荐歌单"
          >
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
          <ModuleCard
            headerTitle="独家放送"
          >
            <div className={styles.three_image_box}>
              {
                privatecontent.map(item => {
                  return (
                    <div key={item.id} className={styles.image} onClick={() => { }}>
                      <ImageCard imageInfo={item} />
                    </div>
                  )
                })
              }
            </div>
          </ModuleCard>
          <ModuleCard
            headerTitle="推荐MV"
          >
            <div className={styles.three_image_box} style={{ gridTemplateColumns: `repeat(${personalizedMV.length || 3}, 1fr)` }}>
              {
                personalizedMV.map(item => {
                  return (
                    <div key={item.id} className={styles.image} onClick={() => { }}>
                      <ImageCard imageInfo={item} />
                    </div>
                  )
                })
              }
            </div>
          </ModuleCard>
        </div>
      </div>
    </div>
  )
};

export default Discover;