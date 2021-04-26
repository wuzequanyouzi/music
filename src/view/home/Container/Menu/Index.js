import { useState } from 'react';
import styles from './Menu.module.scss';
const Menu = (props) => {

  // 选中的菜单项
  const [activeMenuItem, setActiveMenuItem] = useState('发现音乐');

  // 单击菜单事件
  const handleClickMenuItem = (menuItem) => {
    setActiveMenuItem(menuItem);
  }
  const {
    menu = [
      {
        name: '发现音乐',
        path: '/home'
      },
      {
        name: '视频'
      },
      {
        name: '朋友'
      },
      {
        name: '直播'
      },
      {
        name: '私人FM'
      }
    ],
    myMusic = [
      {
        name: '本地音乐'
      },
      {
        name: '下载管理'
      }
    ],
    songSheet = [
      {
        name: '我喜欢的音乐'
      }
    ]
  } = props;
  return (
    <div className={styles.menu}>
      <div className={styles.plubic_menu}>
        {
          menu.map(menuItem => (
            <div
              key={menuItem.name}
              className={`${styles.plubic_menu_item} ${activeMenuItem === menuItem.name ? styles.plubic_menu_item_active : ''}`}
              onClick={() => handleClickMenuItem(menuItem.name)}
            >{menuItem.name}</div>
          ))
        }
      </div>
      <div className={styles.my_music}>
        <header className={styles.header}>
          我的音乐
        </header>
        <div className={styles.container}>
          {
            myMusic.map(musicItem => (
              <div
                key={musicItem.name}
                className={`${styles.my_music_item} ${activeMenuItem === musicItem.name ? styles.plubic_menu_item_active : ''}`}
                onClick={() => handleClickMenuItem(musicItem.name)}
              >
                <i className={`iconfont icon-tinggeshiqu ${styles.public_icon}`}></i>
                <span>{musicItem.name}</span>
              </div>
            ))
          }
        </div>
      </div>
      <div className={styles.my_music}>
        <header className={styles.header}>
          创建的歌单
        </header>
        <div className={styles.container}>
          {
            songSheet.map(musicItem => (
              <div
                key={musicItem.name}
                className={`${styles.my_music_item} ${activeMenuItem === musicItem.name ? styles.plubic_menu_item_active : ''}`}
                onClick={() => handleClickMenuItem(musicItem.name)}
              >
                <i className={`iconfont icon-tinggeshiqu ${styles.public_icon}`}></i>
                <span>{musicItem.name}</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
};

export default Menu;