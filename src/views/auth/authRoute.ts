import React from "react";

const Login = React.lazy(() => import("./Login"));
const Register = React.lazy(() => import("./Register"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/login", exact: true, name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register, exact: true },
];

export default routes;
