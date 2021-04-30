import { useState, useEffect, useRef } from 'react';
import ReactDom from 'react-dom';

import styles from './ContextMenu.module.scss';

const ContextMenu = (props) => {
  const {
    className,
    isShow = false,
    left = 0,
    top = 0
  } = props;
  const [isInSheet, setIsInSheet] = useState(false);
  return (
    ReactDom.createPortal(
      <div className={`${className} ${styles.context_menu}`}>
        <div className={styles.up}>
          <div className={styles.view_comments}>
            <i className={`iconfont icon-pinglun`}></i>
            <span>查看评论(889)</span>
          </div>
          <div className={styles.play}>
            <i className={`iconfont icon-play1`}></i>
            <span>播放</span>
          </div>
          <div className={styles.nextsong}>
            <i className={`iconfont icon-nextsong`}></i>
            <span>下一首播放</span>
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.collected}>
            <i className={`iconfont icon-collected`}></i>
            <span>收藏到歌单</span>
          </div>
          <div className={styles.link}>
            <i className={`iconfont icon-link`}></i>
            <span>复制链接</span>
          </div>
          <div className={styles.download}>
            <i className={`iconfont icon-download`}></i>
            <span>下载</span>
          </div>
        </div>
        <div className={styles.down}>
          {
            isInSheet
              ?
              <div>
                <i className={`iconfont icon-delete`}></i>
                <span>从歌单中删除</span>
              </div>
              : ''
          }
        </div>
      </div>,
      document.body)
  );
};

export default ContextMenu;