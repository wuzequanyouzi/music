import styles from './header.module.scss';
import { NavLink } from 'react-router-dom';
import { Input, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState, useCallback, useEffect } from 'react'
import { useStore, useDispatch } from 'react-redux';
import { LOGIN_INFO } from '@/store/type/user.js';

const { ipcRenderer } = window.require('electron');
const SearchIcon = () => (
  <i className={`iconfont icon-search ${styles.search_icon}`}></i>
)

// 登录后的事件触发回调
let loginAfterReplyEvent = null;
const loginAfterReplyHandler = (callBack) => {
  if (!loginAfterReplyEvent) {
    loginAfterReplyEvent = true;
    ipcRenderer.on('login-after-reply', (event, userInfo) => {
      typeof callBack === 'function' && callBack(userInfo);
      ipcRenderer.send('login-window-close');
    });
  }
}

const Header = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLogined, setIsLogined] = useState(false);

  // 获取state的用户信息
  const store = useStore()
  const dispatch = useDispatch();

  // 更新用户信息的钩子
  const setLoginInfo = useCallback((loginInfo) => dispatch({
    type: LOGIN_INFO,
    loginInfo
  }), [dispatch]);

  // 登录之后事件回调
  ipcRenderer.on('login-after', (event, ...args) => {
    console.log(event, args);
  });

  // 监听登录成功
  loginAfterReplyHandler(setLoginInfo);

  // 监听state发生变化
  const unSubscribe = store.subscribe(() => {
    setUserInfo(store.getState().USER_INFO.loginInfo);
    setIsLogined(true);
  });

  const handleClickLogin = () => {
    !isLogined && ipcRenderer.send('login-before', 'login');
  };

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
          <NavLink to="/home/test"><i className={`iconfont icon-tinggeshiqu font_size_20 ${styles.listen_icon}`} ></i></NavLink>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.user_option} onClick={handleClickLogin}>
          <div className={styles.user_avatar} >
            <Avatar
              size={32}
              icon={<UserOutlined />}
              src={
                isLogined ? userInfo.profile.avatarUrl : ''
              } />
          </div>
          {
            (!isLogined && userInfo.code !== 200)
            ? <span>未登录</span>
            : <span className={styles.nickname}>{userInfo.profile.nickname}</span>
          }
        </div>
        <div className={styles.system_option}>
          <i className={`iconfont icon-suoxiao`} style={{ fontSize: '20px', cursor: 'pointer' }}></i>
          <i className={`iconfont icon-fangda`} style={{ fontSize: '20px', cursor: 'pointer' }}></i>
          <i className={`iconfont icon-guanbi`} style={{ fontSize: '18px', cursor: 'pointer' }}></i>
        </div>
      </div>
    </div>
  )
}

export default Header;