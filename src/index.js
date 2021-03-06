import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import { Switch, Route, Redirect } from 'react-router';
import routes from "@/routes/index.js";
import state from '@/store/index.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import '@/assets/css/index.css';
import '@/assets/iconfont/index.css';
import 'antd/dist/antd.css';
// import reportWebVitals from './reportWebVitals';

import HomeLayout from '@/layout/HomeLayout/Index.js';
const store = createStore(state);

const getRouterByRouters = (routes) => {
  const renderedRoutesList = [];
  const renderRoutes = (routes, parentPath) => {
    Array.isArray(routes) && routes.forEach((route) => {
      const { path, redirect, children, layout, component } = route;
      if (layout) {
        <Route
          key={`${parentPath}${path}`}
          exact
          path={`${parentPath}${path}`}
          component={component}
        />
      }
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
          layout ? <Route
            key={`${parentPath}${path}`}
            exact path={`${parentPath}${path}`}
            render={(props) => React.createElement(layout, props, React.createElement(component, props))} /> :
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
};

window.store = store;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route
            path="/"
          >
            <HomeLayout>
              <Switch>
                {getRouterByRouters(routes)}
              </Switch>
            </HomeLayout>
          </Route>
        </Switch>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
