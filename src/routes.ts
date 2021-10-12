import React from 'react';
import { redirectIfUserUnauthorized } from './modules/result/roleChecking';
import { Role } from './shared/enum/role';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const Grade = React.lazy(() => import('./modules/grade/Grade'));
const GradeUpdate = React.lazy(() => import('./modules/grade/GradeUpdate'));

const User = React.lazy(() => import('./modules/user/User'));
const UserUpdate = React.lazy(() => import('./modules/user/UserUpdate'));
const UserInfo = React.lazy(() => import('./modules/user-detail/UserDetail'));

const Subject = React.lazy(() => import('./modules/subject/Subject'));
const SubjectUpdate = React.lazy(() => import('./modules/subject/SubjectUpdate'));

const Class = React.lazy(() => import('./modules/class/Class'));
const ClassUpdate = React.lazy(() => import('./modules/class/ClassUpdate'));

const Semester = React.lazy(() => import('./modules/semester/Semester'));
const SemesterUpdate = React.lazy(() => import('./modules/semester/SemesterUpdate'));


const Tuition = React.lazy(() => import('./modules/tuition/Tuition'));
//const TuitionUpdate = React.lazy(() => import('./modules/tuition/TuitionUpdate'));

const Result = React.lazy(() => import('./modules/result/Result'));
const StudentResult = React.lazy(() => import('./modules/result/StudentResult'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: redirectIfUserUnauthorized(Dashboard, Role.ADMIN) },

  { path: '/grades', exact: true, name: 'Quản lý khối', component: redirectIfUserUnauthorized(Grade, Role.ADMIN) },
  { path: '/grades/create', name: 'Thêm mới', component: redirectIfUserUnauthorized(GradeUpdate, Role.ADMIN) },
  { path: '/grades/:_id/update', name: 'Cập nhật', component: redirectIfUserUnauthorized(GradeUpdate, Role.ADMIN) },

  { path: '/subjects', exact: true, name: 'Quản lý bộ môn', component: redirectIfUserUnauthorized(Subject, Role.ADMIN) },
  { path: '/subjects/create', name: 'Thêm mới', component: redirectIfUserUnauthorized(SubjectUpdate, Role.ADMIN) },
  { path: '/subjects/:_id/update', name: 'Cập nhật', component: redirectIfUserUnauthorized(SubjectUpdate, Role.ADMIN) },

  { path: '/users', exact: true, name: 'Quản lý người dùng', component: redirectIfUserUnauthorized(User, Role.ADMIN) },
  { path: '/users/:_id/update',  name: 'Cập nhật', component: redirectIfUserUnauthorized(UserUpdate, Role.ADMIN) },
  { path: '/users/create',  name: 'Thêm mới', component: redirectIfUserUnauthorized(UserUpdate, Role.ADMIN) },
  
  { path: '/info', exact: true, name: 'Thông tin người dùng', component: redirectIfUserUnauthorized(UserInfo, Role.ADMIN, Role.STUDENT, Role.TEACHER) },

  { path: '/classes', exact: true, name: 'Quản lý lớp', component: redirectIfUserUnauthorized(Class, Role.ADMIN) },
  { path: '/classes/create', name: 'Thêm mới', component: redirectIfUserUnauthorized(ClassUpdate, Role.ADMIN) },
  { path: '/classes/:id/update', name: 'Cập nhật', component: redirectIfUserUnauthorized(ClassUpdate, Role.ADMIN) },

  { path: '/semesters', exact: true, name: 'Quản lý học kỳ', component: redirectIfUserUnauthorized(Semester, Role.ADMIN) },
  { path: '/semesters/create', name: 'Thêm mới', component: redirectIfUserUnauthorized(SemesterUpdate, Role.ADMIN) },
  { path: '/semesters/:_id/update', name: 'Cập nhật', component: redirectIfUserUnauthorized(SemesterUpdate, Role.ADMIN) },
  { path: '/tuitions', exact: true, name: 'Quản lý học phí', component: Tuition },
  { path: '/tuitions/create', name: 'Thêm mới', component: TuitionUpdate },
  { path: '/tuitions/:id/update', name: 'Cập nhật', component: TuitionUpdate },
  { path: '/tuitions/:id/create-checkout-session', name: 'Đóng tiền', component: TuitionUpdate },

  { path: '/results', exact: true, name: 'Kết quả học tập', component: Result },
  { path: '/results', exact: true, name: 'Kết quả học tập', component: redirectIfUserUnauthorized(Result, Role.ADMIN, Role.TEACHER) },
  { path: '/academic', exact: true, name: 'Kết quả học tập', component: redirectIfUserUnauthorized(StudentResult, Role.STUDENT) },
];

export default routes;
