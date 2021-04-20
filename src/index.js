import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "./routes/index.js";
import state from './store/index.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import '@/assets/css/index.css';
import '@/assets/iconfont/index.css';
import 'antd/dist/antd.css';
// import reportWebVitals from './reportWebVitals';

const store = createStore(state);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        {renderRoutes(routes)}
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
