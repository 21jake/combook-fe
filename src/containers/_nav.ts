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
    name: 'Quản lý khối',
    to: '/grade',
    icon: 'cib-elastic-stack',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Đăng xuất',
    icon: 'cil-account-logout',
    onClick: handleLogout,
  },
];
// cibElasticStack
