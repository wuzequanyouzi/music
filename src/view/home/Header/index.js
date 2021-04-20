import styles from './header.module.css';
import { NavLink } from 'react-router-dom';
import { Input } from 'antd';
const SearchIcon = () => (
  <i className={`iconfont icon-search ${styles.search_icon}`}></i>
)
const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.title}>
          <i className={`iconfont icon-wangyiyunyinle ${styles.logo}`}></i>
          <header className={styles.label}>网易云音乐</header>
        </div>
        <div className={styles.search_box}>
          <div className={styles.search_input}>
            <Input className={styles.input} prefix={<SearchIcon />}></Input>
          </div>
          <i className="iconfont icon-tinggeshiqu font_size_20"></i>
        </div>
      </div>
      <div className={styles.right}></div>
    </div>
  )
}

export default Header;