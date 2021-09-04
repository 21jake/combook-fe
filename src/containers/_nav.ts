import handleLogout from '../modules/auth/logout';

export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý người dùng',
    to: '/users',
    icon: 'cil-people',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý khối',
    to: '/grades',
    icon: 'cib-elastic-stack',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý lớp',
    to: '/classes',
    icon: 'cil-room',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý bộ môn',
    to: '/subjects',
    icon: 'cil-book',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý học kỳ',
    to:'/semesters',
    icon: 'cil-calendar',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý học phí',
    to:'/tuitions',
    icon: 'cil-money',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Kết quả học tập',
    to:'/results',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Đăng xuất',
    icon: 'cil-account-logout',
    onClick: handleLogout,
  },
  
];
// cibElasticStack
