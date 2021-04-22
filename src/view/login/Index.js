import React from 'react';
import ReactDOM from 'react-dom';
import antd from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import state from '@/store/index.js';
import { LoginService } from '@/api';

// 样式
import '@/assets/css/index.css';
import styles from './Login.module.scss';

// 图片
import logo from '@/assets/images/boluo.png';

const { ipcRenderer } = window.require('electron');

const Login = () => {
  const handleClickClose = () => {
    LoginService.phoneLogin({
      phone: 15217980296,
      password: 110120
    }).then(data => {
      console.log(data);
    })
    ipcRenderer.send('login-window-close');
  };
  return (
    <div className={styles.login}>
      <span className={styles.close} onClick={handleClickClose} >
        <CloseOutlined />
      </span>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
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