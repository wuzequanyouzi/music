import React, { lazy, Suspense } from 'react';
import HomeLayout from '@/layout/HomeLayout/Index.js';

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
};

const Discover = lazy(() => import('@/view/Discover/Index.js'));
const SongSheet = lazy(() => import('@/components/song/SongSheet/Index.js'));
const Test = lazy(() => import('@/view/test/Index.js'));
const Login = lazy(() => import('@/view/login/Index.js'));

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    redirect: '/home/discover',
    children: [
      {
        path: '/discover',
        layout: HomeLayout,
        component: SuspenseComponent(Discover)
      }
    ]
  },
  {
    path: '/songSheet',
    layout: HomeLayout,
    component: SuspenseComponent(SongSheet)
  },
  {
    path: '/test',
    // layout: HomeLayout,
    component: SuspenseComponent(Test)
  }
]

export default routes;