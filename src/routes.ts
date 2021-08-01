import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Setting = React.lazy(() => import("./views/setting/Setting"));
const Identification = React.lazy(() => import("./views/setting/identification/Identification"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
  { path: "/setting", name: "Setting", exact: true },
  { path: "/setting/setting", name: "Setting", component: Setting, exact: true },
  { path: "/setting/identification", name: "Identification", component: Identification, exact: true },
];

export default routes;
