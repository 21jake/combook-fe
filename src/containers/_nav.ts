export default [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: "cil-speedometer",
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Settings",
    to: "/setting",
    icon: "cil-trash",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Setting",
        to: "/setting/setting",
        // icon: "cil-speedometer",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Identification",
        to: "/setting/identification",
        // icon: "cil-speedometer",
      },
    ],
  },
];
