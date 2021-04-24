import { useState, useEffect } from 'react'

// 样式 图片
import styles from './Carousel.module.scss';

const Carousel = (props) => {

  const {
    imageList = []
  } = props;

  const [lastIndex, setLastIndex] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [nextIndex, setNextIndex] = useState(3);
  const [recordIndex, setRecordIndex] = useState(1);
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    console.log(imageList);
    setCarouselImages(imageList.slice(0, 4));
  }, [imageList])

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


  const indexMap = {
    1: 3,
    2: 4,
    3: 1,
    4: 2
  }

  // 点击下标事件
  const handleClickImageItem = (_curIndex, imageInfo) => {
    const difference = _curIndex - recordIndex;
    let _lastIndex = lastIndex;
    let _currentIndex = currentIndex;
    let _nextIndex = nextIndex;

    let resultImages = [];

    if (difference === 1) {
      _lastIndex = currentIndex
      _currentIndex = currentIndex + 1;
      if (_currentIndex > 4) {
        _currentIndex = 1;
      }
      if (_currentIndex === 4) {
        _nextIndex = 1;
      } else {
        _nextIndex = _currentIndex + 1;
      }


      let afterIndex = indexMap[_currentIndex];
      console.log((_curIndex + 2) % imageList.length)

      resultImages = [...carouselImages.slice(0, afterIndex - 1), imageList[(_curIndex + 2) % imageList.length], ...carouselImages.slice(afterIndex, carouselImages.length)]

    } else if (difference === -1) {
      _nextIndex = _currentIndex;
      _currentIndex = currentIndex - 1;
      if (_currentIndex < 1) {
        _currentIndex = 4;
      }
      if (_currentIndex === 1) {
        _lastIndex = 4;
      } else {
        _lastIndex = _currentIndex - 1;
      }

      let afterIndex = indexMap[_currentIndex];


      console.log((_curIndex - 1 + 10) % imageList.length)

      resultImages = [...carouselImages.slice(0, afterIndex - 1), imageList[(_curIndex - 1 + 10) % imageList.length], ...carouselImages.slice(afterIndex, carouselImages.length)]

    }

    console.log(_lastIndex,
      _currentIndex,
      _nextIndex)

    setCarouselImages(resultImages)
    setRecordIndex(_curIndex);
    setLastIndex(_lastIndex);
    setCurrentIndex(_currentIndex);
    setNextIndex(_nextIndex);
  };


  return (
    <div className={styles.carousel}>
      <div className={styles.carousel_container}>
        {
          carouselImages.map((image, index) => {
            return (
              <div key={index} className={`${styles.default} ${switchClass(index + 1)}`}><img src={image.pic} className={styles.img} alt="" /></div>
            );
          })
        }
        {/* <div
          className={`${styles.default} ${switchClass(1)}`}
        ><img src={png1} className={styles.img} alt="" /></div>
        <div className={`${styles.default} ${switchClass(2)}`}><img src={png2} className={styles.img} alt="" /></div>
        <div className={`${styles.default} ${switchClass(3)}`}><img src={png3} className={styles.img} alt="" /></div>
        <div className={`${styles.default} ${switchClass(4)}`}><img src={png4} className={styles.img} alt="" /></div> */}
      </div>
      <div className={styles.footer}>
        {
          imageList.map((imageInfo, index) => {
            return (
              <div key={index} className={`${styles.item} ${recordIndex === index ? styles.active : ''}`} onClick={() => { handleClickImageItem(index, imageInfo) }}></div>
            )
          })
        }
      </div>
    </div>
  )
};

export default Carousel;