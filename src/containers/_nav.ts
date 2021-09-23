import handleLogout from '../modules/auth/logout';
import { handleItemVisibility } from '../modules/result/roleChecking';
import { Role } from '../shared/enum/role';

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
    className: handleItemVisibility(Role.ADMIN)
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý khối',
    to: '/grades',
    icon: 'cib-elastic-stack',
    className: handleItemVisibility(Role.ADMIN)
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý lớp',
    to: '/classes',
    icon: 'cil-room',
    className: handleItemVisibility(Role.ADMIN)
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý bộ môn',
    to: '/subjects',
    icon: 'cil-book',
    className: handleItemVisibility(Role.ADMIN)
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý học kỳ',
    to:'/semesters',
    icon: 'cil-calendar',
    className: handleItemVisibility(Role.ADMIN)
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Kết quả học tập',
    to:'/results',
    icon: 'cil-pencil',
    className: handleItemVisibility(Role.ADMIN, Role.TEACHER)
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Kết quả học tập',
    to:'/academic',
    icon: 'cil-pencil',
    className: handleItemVisibility(Role.STUDENT)
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Thông tin người dùng',
    to:'/info',
    icon: 'cil-user'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Đăng xuất',
    icon: 'cil-account-logout',
    onClick: handleLogout,
  },
  
];
// cibElasticStack
