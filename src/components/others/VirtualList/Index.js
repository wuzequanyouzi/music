import { useState, useEffect, useMemo, useRef } from 'react';

import styles from './VirtualList.module.scss';


const VirtualList = (props) => {
  const {
    itemSize = 35,
    lists = new Array(300).fill(99)
  } = props;

  const listRef = useRef(null);

  const [screenHeight, setScreenHeight] = useState(0);
  const [start, setStart] = useState(0);
  const [startOffset, setStartOffset] = useState(0);


  // 获取当前组件的高度
  useEffect(() => {
    setScreenHeight(listRef.current.clientHeight);
  }, []);

  // 列表总高度
  const listHeight = useMemo(() => {
    return lists.length * itemSize;
  }, [lists, itemSize]);

  // 计算可显示的个数
  const visibleCount = useMemo(() => {
    console.log(Math.ceil(screenHeight / itemSize))
    return Math.ceil(screenHeight / itemSize);
  }, [screenHeight, itemSize]);

  // 渲染的列表数据
  const visibleData = useMemo(() => {
    const _end = start + visibleCount;
    console.log(lists.slice(start, Math.min(_end, lists.length)));
    return lists.slice(start, Math.min(_end, lists.length));
  }, [start, lists, visibleCount]);

  //偏移量对应的style
  const getTransform = useMemo(() => {
    return `translate3d(0, ${startOffset}px, 0)`;
  }, [startOffset]);

  // 滚动事件回调
  const scrollEvent = () => {
    // 当前滚动位置
    let scrollTop = listRef.current.scrollTop;

    //此时的开始索引
    let _start = Math.floor(scrollTop / itemSize);

    //此时的偏移量
    let _startOffset = scrollTop - (scrollTop % itemSize);

    setStart(_start);
    setStartOffset(_startOffset);
  };

  return (
    <div className={styles.infinite_list_container} ref={listRef} onScroll={scrollEvent} >
      <div className={styles.infinite_list_phantom} style={{ height: `${listHeight}px` }} ></div>
      <div className={styles.infinite_list} style={{ transform: getTransform }}>
        {
          visibleData.map((listItem, index) => {
            return (
              <div key={index} className={`${styles.item}`} style={{ height: `${itemSize}px` }} >{listItem}</div>
            )
          })
        }
      </div>
    </div>
  )
};

export default VirtualList;