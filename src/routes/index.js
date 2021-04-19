import React, { lazy, Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import BlanlLayout from '@/layout/BlankLayout/index.js';
import HomeLayout from '@/layout/HomeLayout';

export default [
  {
    component: BlanlLayout,
    routes: [
      {
        path: '/',
        component: HomeLayout
      }
    ]
  }
];