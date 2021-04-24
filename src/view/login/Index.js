import React, { useState } from 'react';
import * as md5 from 'md5';
import ReactDOM from 'react-dom';
import { Input, Switch } from 'antd';
import { CloseOutlined, MobileOutlined, LockOutlined } from '@ant-design/icons';
import { LoginService } from '@/api';

// 样式
import '@/assets/css/index.css';
import styles from './Login.module.scss';
import 'antd/dist/antd.css';

// 图片
import logo from '@/assets/images/boluo.png';

const { ipcRenderer } = window.require('electron');

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAutoLogin, setIsAutoLogin] = useState(true);

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClickLogin = () => {
    console.log(username, password)
    LoginService.phoneLogin({
      phone: username,
      md5_password: md5(password)
    }).then(data => {
      console.log(data);
      ipcRenderer.send('login-after', data);
      // handleClickClose();
    })
  };

  const handleClickClose = () => {
    ipcRenderer.send('login-window-close');
  };

  // 自动登录
  const handleChangeAutoLogin = (checked) => {
    setIsAutoLogin(checked);
  }

  return (
    <div className={styles.login}>
      <div className={styles.color}></div>
      <div className={styles.color}></div>
      <div className={styles.color}></div>
      <span className={styles.close} onClick={handleClickClose} >
        <CloseOutlined />
      </span>
      <div className={styles.circle_box}>
        <div className={styles.circle} style={{ '--x': 0 }}></div>
        <div className={styles.circle} style={{ '--x': 1 }}></div>
        <div className={styles.circle} style={{ '--x': 2 }}></div>
        <div className={styles.circle} style={{ '--x': 3 }}></div>
        <div className={styles.circle} style={{ '--x': 4 }}></div>
      </div>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.login_info}>
          <div className={styles.info_item}>
            <Input prefix={<MobileOutlined />} value={username} onChange={handleChangeUsername} placeholder="请输入用户名" />
          </div>
          <div className={styles.info_item}>
            <Input.Password prefix={<LockOutlined />} value={password} onChange={handleChangePassword} placeholder="请输入密码" />
          </div>
          <div className={styles.info_item}>
            <div className={styles.login_auto}>
              <Switch size="small" defaultChecked onChange={handleChangeAutoLogin} />
              <span style={{ 'marginLeft': '10px' }}>自动登录</span>
            </div>
          </div>
          <div className={styles.login_btn} onClick={handleClickLogin}>
            登录
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
  document.getElementById('root')
);