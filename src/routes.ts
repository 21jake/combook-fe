import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const Grade = React.lazy(() => import('./modules/grade/Grade'));
const GradeUpdate = React.lazy(() => import('./modules/grade/GradeUpdate'));

const Class = React.lazy(() => import('./modules/class/Class'));
const ClassUpdate = React.lazy(() => import('./modules/class/ClassUpdate'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/grades', exact: true, name: 'Quản lý khối', component: Grade },
  { path: '/grades/create', name: 'Thêm mới', component: GradeUpdate },
  { path: '/grades/:_id/update', name: 'Cập nhật', component: GradeUpdate },

  
  { path: '/classes', exact: true, name: 'Quản lý lớp', component: Class },
  { path: '/classes/create', name: 'Thêm mới', component: ClassUpdate },
  { path: '/classes/:id/update', name: 'Cập nhật', component: ClassUpdate },
];

export default routes;
