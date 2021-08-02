import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Grade = React.lazy(() => import('./modules/grade/Grade'));
const GradeUpdate = React.lazy(() => import('./modules/grade/GradeUpdate'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/grades', exact: true, name: 'Quản lý khối', component: Grade },
  { path: '/grades/:_id/update', name: 'Cập nhật', component: GradeUpdate },
  { path: '/grades/create', name: 'Thêm mới', component: GradeUpdate },
];

export default routes;
