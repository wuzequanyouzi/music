import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Switch, Route, Redirect } from 'react-router';
import routes from "@/routes/index.js";
import state from '@/store/index.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import '@/assets/css/index.css';
import '@/assets/iconfont/index.css';
import 'antd/dist/antd.css';
// import reportWebVitals from './reportWebVitals';

const store = createStore(state);

const getRouterByRouters = (routes) => {
  const renderedRoutesList = [];
  const renderRoutes = (routes, parentPath) => {
    Array.isArray(routes) && routes.forEach((route) => {
      const { path, redirect, children, layout, component } = route;
      if (redirect) {
        renderedRoutesList.push(
          <Redirect
            key={`${parentPath}${path}`}
            exact
            from={path}
            to={`${parentPath}${redirect}`}
          />
        )
      }
      if (component) {
        renderedRoutesList.push(
          layout?<Route 
            key={`${parentPath}${path}`} 
            exact path={`${parentPath}${path}`}
            render={(props)=>React.createElement(layout,props,React.createElement(component,props))} />:
          <Route
            key={`${parentPath}${path}`}
            exact
            path={`${parentPath}${path}`}
            component={component}
          />
        )
      }
      if (Array.isArray(children) && children.length > 0) {
        renderRoutes(children, path);
      }
    });
  }
  renderRoutes(routes, '');
  console.log(renderedRoutesList);
  return renderedRoutesList;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {getRouterByRouters(routes)}
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
