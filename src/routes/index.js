import React, { lazy, Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import BlanlLayout from '@/layout/BlankLayout/index.js';
import HomeLayout from '@/layout/HomeLayout';

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
};

const Test = lazy(() => import('@/view/test/index.js'));

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
      }
    ]
  }
];

export default routes;