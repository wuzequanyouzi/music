import styles from './header.module.scss';
import { NavLink } from 'react-router-dom';
import { Input } from 'antd';
console.log(styles)
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
            <Input placeholder="搜索" className={styles.input} prefix={<SearchIcon />}></Input>
          </div>
          <i className={`iconfont icon-tinggeshiqu font_size_20 ${styles.listen_icon}`}></i>
        </div>
      </div>
      <div className={styles.right}></div>
    </div>
  )
}

export default Header;