import { useState, useEffect, useRef } from 'react';
import { RightOutlined } from '@ant-design/icons';

// 样式
import styles from './ModuleCard.module.scss';

const ModuleCard = (props) => {
  const {
    children,
    headerTitle = '推荐歌单',
    className
  } = props;
  return (
    <div className={`${styles.module_card} ${className}`}>
      <div className={styles.header}>
        <span>{headerTitle}</span>
        <RightOutlined style={{ fontSize: '18px', color: '#777' }}/>
      </div>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  )
};

export default ModuleCard;