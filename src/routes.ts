import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const Grade = React.lazy(() => import('./modules/grade/Grade'));
const GradeUpdate = React.lazy(() => import('./modules/grade/GradeUpdate'));

const User = React.lazy(() => import('./modules/user/User'));
const UserUpdate = React.lazy(() => import('./modules/user/UserUpdate'));

const Subject = React.lazy(() => import('./modules/subject/Subject'));
const SubjectUpdate = React.lazy(() => import('./modules/subject/SubjectUpdate'));

const Class = React.lazy(() => import('./modules/class/Class'));
const ClassUpdate = React.lazy(() => import('./modules/class/ClassUpdate'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/grades', exact: true, name: 'Quản lý khối', component: Grade },
  { path: '/grades/create', name: 'Thêm mới', component: GradeUpdate },
  { path: '/grades/:_id/update', name: 'Cập nhật', component: GradeUpdate },

  { path: '/subjects', exact: true, name: 'Quản lý bộ môn', component: Subject },
  { path: '/subjects/create', name: 'Thêm mới', component: SubjectUpdate },
  { path: '/subjects/:_id/update', name: 'Cập nhật', component: SubjectUpdate },

  { path: '/users', exact: true, name: 'Quản lý người dùng', component: User },
  { path: '/users/:_id/update',  name: 'Cập nhật', component: UserUpdate },
  { path: '/users/create',  name: 'Thêm mới', component: UserUpdate },

  { path: '/classes', exact: true, name: 'Quản lý lớp', component: Class },
  { path: '/classes/create', name: 'Thêm mới', component: ClassUpdate },
  { path: '/classes/:id/update', name: 'Cập nhật', component: ClassUpdate },
];

export default routes;
