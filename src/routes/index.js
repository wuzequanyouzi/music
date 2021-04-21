import React, { lazy, Suspense } from 'react';
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
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: HomeLayout,
    children: [
      {
        path: '/test',
        layout: HomeLayout,
        component: SuspenseComponent(Test)
      }
    ]
  }
]

export default routes;