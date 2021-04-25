/**
 * @description: 一个轮播图组件，思路是通过变换类名和数组元素达到轮播的效果
 * @author: 柚子
 */
import { useState, useEffect, useCallback, useRef } from 'react'

// 样式 图片
import styles from './Carousel.module.scss';
import img1 from '@/assets/images/1.jpg';
import img2 from '@/assets/images/2.jpg';
import img3 from '@/assets/images/3.jpg';
import img4 from '@/assets/images/4.jpg';
import img5 from '@/assets/images/5.jpg';
import img6 from '@/assets/images/6.jpg';
import img7 from '@/assets/images/7.jpg';
import img8 from '@/assets/images/8.jpg';
import img9 from '@/assets/images/9.jpg';
import img10 from '@/assets/images/10.jpg';

// let imageList = [
//   {
//     pic: img1
//   },
//   {
//     pic: img2
//   },
//   {
//     pic: img3
//   },
//   {
//     pic: img4
//   },
//   {
//     pic: img5
//   },
//   {
//     pic: img6
//   },
//   {
//     pic: img7
//   },
//   {
//     pic: img8
//   },
//   {
//     pic: img9
//   },
//   {
//     pic: img10
//   }
// ]
let autoplayAnimationFramer = null;
let autoPlayIndex = 0;

const Carousel = (props) => {

  const {
    imageList = [],
    autoplay = false,
    delayTime = 2000,
    isShowDots = true
  } = props;

  // 轮播图源数组
  const [orgImages, setOrgImages] = useState(imageList);

  // 轮播数组上一张图索引
  const [lastIndex, setLastIndex] = useState(0);

  // 轮播数组当前图索引
  const [currentIndex, setCurrentIndex] = useState(1);

  // 轮播数组下一张图索引
  const [nextIndex, setNextIndex] = useState(2);

  // 记录索引
  const [recordIndex, setRecordIndex] = useState(0);

  // 轮播数组数据
  const [carouselImages, setCarouselImages] = useState([]);
  window.carouselImages = carouselImages;

  // 转换过程标识
  const [switching, setSwitching] = useState(false);

  const savedCallback = useRef();

  useEffect(() => {
    setOrgImages(imageList);
  }, [imageList]);

  useEffect(() => {
    setCarouselImages([...orgImages.slice(-1), ...orgImages.slice(0, 4)]);
  }, [orgImages]);

  useEffect(() => {
    setTimeout(() => {
      carouselImages.length >= 5 && autoplay && autoPlay();
    }, 1000)
    return () => {
      cancelAutoPlay();
    };
  }, [carouselImages.length])

  // 等差值
  const diffValue = orgImages.length - 2;

  // 判断下标
  const switchClass = (index) => {
    let className = ''
    switch (index) {
      case lastIndex:
        className = styles.left;
        break;

      case currentIndex:
        className = styles.center;
        break;

      case nextIndex:
        className = styles.right;
        break;

      default:
        className = `${styles.after} carousel_after`;
        break;
    }
    return className;
  };

  // 计算转到上一张图时，各个下标
  const computedLastIndexs = (currentIndex) => {
    let _nextIndex = currentIndex;
    let _currentIndex = currentIndex - 1;
    let _lastIndex = null;
    if (_currentIndex < 0) {
      _currentIndex = 4;
    }
    if (_currentIndex === 0) {
      _lastIndex = 4;
    } else {
      _lastIndex = _currentIndex - 1;
    }
    return {
      _nextIndex,
      _currentIndex,
      _lastIndex
    }
  }

  // 计算转到下一张图时，各个下标
  const computedNextIndexs = (currentIndex) => {
    let _lastIndex = currentIndex
    let _currentIndex = currentIndex + 1;
    let _nextIndex = null;
    if (_currentIndex > 4) {
      _currentIndex = 0;
    }
    if (_currentIndex === 4) {
      _nextIndex = 0;
    } else {
      _nextIndex = _currentIndex + 1;
    }
    return {
      _lastIndex,
      _currentIndex,
      _nextIndex
    }
  };

  // 根据当前选中的索引重新生成轮播数组
  const recalculation = (currentImageIndex) => {
    const indexs = [
      (currentImageIndex + diffValue) % orgImages.length,
      (currentImageIndex + diffValue + 1) % orgImages.length,
      currentImageIndex,
      (currentImageIndex + 1) % orgImages.length,
      (currentImageIndex + 2) % orgImages.length
    ];
    const resultArr = indexs.map(index => {
      return orgImages[index];
    })
    setCarouselImages(resultArr);
  };

  // 点击下标事件
  const handleClickImageItem = (_curIndex) => {
    if (_curIndex === recordIndex) return;
    const difference = _curIndex - recordIndex;
    setSwitching(false);
    let _lastIndex = lastIndex;
    let _currentIndex = currentIndex;
    let _nextIndex = nextIndex;

    let mainContainers = carouselImages.slice();

    if (Math.abs(difference) > 1 && Math.abs(difference) < orgImages.length - 1) {
      setSwitching(true);
      // 记录索引
      setRecordIndex(() => _curIndex);
      setTimeout(() => {

        // 重置轮播数组
        recalculation(_curIndex);

        // 重置轮播指针
        setLastIndex(1);
        setCurrentIndex(2);
        setNextIndex(3);

        // 动画复原
        setSwitching(false);
      }, 350);
    } else {
      if (difference === 1 || difference === -(orgImages.length - 1)) {
        const indexsObj = computedNextIndexs(currentIndex);
        _lastIndex = indexsObj._lastIndex;
        _currentIndex = indexsObj._currentIndex;
        _nextIndex = indexsObj._nextIndex;
      } else if (difference === -1 || difference === (orgImages.length - 1)) {
        const indexsObj = computedLastIndexs(currentIndex);
        _lastIndex = indexsObj._lastIndex;
        _currentIndex = indexsObj._currentIndex;
        _nextIndex = indexsObj._nextIndex;
      }

      /* 计算下标 */
      // 隐藏的上一张图片在原数组中的下标
      const afterOneRemainder = (_curIndex + diffValue) % orgImages.length;
      // 隐藏的上一张图片
      const afterOneImage = orgImages[afterOneRemainder];

      // 隐藏的下一张图片在原数组中的下标
      const afterTwoRemainder = (_curIndex + 2) % orgImages.length;
      // 隐藏的下一张图片
      const afterTwoImage = orgImages[afterTwoRemainder];

      // 替换轮播数组中隐藏的图片
      if (_lastIndex - 1 < 0) {
        mainContainers[carouselImages.length - 1] = afterOneImage;
      } else {
        mainContainers[_lastIndex - 1] = afterOneImage;
      }
      if (_nextIndex + 1 > carouselImages.length - 1) {
        mainContainers[0] = afterTwoImage;
      } else {
        mainContainers[_nextIndex + 1] = afterTwoImage;
      }

      setCarouselImages(mainContainers)
      setRecordIndex(() => _curIndex);
      setLastIndex(_lastIndex);
      setCurrentIndex(_currentIndex);
      setNextIndex(_nextIndex);
    }
  };

  // 自动轮播回调
  const animationFrameCallback = () => {
    autoPlayIndex = (autoPlayIndex + 1) % orgImages.length;
    handleClickImageItem(autoPlayIndex);
  };
  // savedCallback是一个useRef，每次渲染都会返回同一个Ref对象，所以current内部的数据是已经更新完成的。
  savedCallback.current = animationFrameCallback;

  // 自动轮播
  const autoPlay = () => {
    cancelAutoPlay();
    autoplayAnimationFramer = setInterval(() => {savedCallback.current();}, delayTime);
  };

  // 取消轮播
  const cancelAutoPlay = () => {
    autoplayAnimationFramer && clearInterval(autoplayAnimationFramer);
  };

  // 鼠标进入元素的事件回调
  const mouseEnterHandler = () => {
    console.log('停止');
    autoplay && cancelAutoPlay();
  };

  // 鼠标离开元素的事件回调
  const mouseLeaveHandler = () => {
    console.log('开始');
    autoplay && autoPlay();
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.carousel_container} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
        {
          carouselImages.map((image, index) => {
            return (
              <div key={index} className={`${styles.default} ${switchClass(index)} ${switching && styles.switching}`}><img src={image.pic} className={styles.img} alt="" /></div>
            );
          })
        }
      </div>
      {
        isShowDots
          ? <div className={styles.footer}>
            {
              orgImages.map((imageInfo, index) => {
                return (
                  <div
                    key={index}
                    className={`${styles.item} ${recordIndex === index ? styles.active : ''}`}
                    onMouseEnter={() => { mouseEnterHandler(); handleClickImageItem(index); }}
                    onMouseLeave={mouseLeaveHandler}
                  ></div>
                )
              })
            }
          </div>
          : ''
      }
    </div>
  )
};

export default Carousel;