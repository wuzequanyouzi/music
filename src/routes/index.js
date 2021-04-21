import React, { lazy, Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import BlanlLayout from '@/layout/BlankLayout/Index.js';
import HomeLayout from '@/layout/HomeLayout/Index.js';

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
};

const Test = lazy(() => import('@/view/test/Index.js'));
const Login = lazy(() => import('@/view/login/Index.js'));

const routes = [
  {
    component: BlanlLayout,
    routes: [
      {
        path: '/',
        component: HomeLayout,
        routes: [
          {
            path: '/test',
            component: SuspenseComponent(Test)
          }
        ]
      },
      {
        path: '/login',
        component: SuspenseComponent(Login)
      }
    ]
  }
];

export default routes;