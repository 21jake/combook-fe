import React from "react";
import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import ReactDOM from "react-dom";
import Particles from "react-particles-js";
import { Provider } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { icons } from "./assets/icons";
import "./i18n/config";
import "./polyfill";
import * as serviceWorker from "./serviceWorker";
import store from "./store";

React.icons = icons;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        position={toast.POSITION.TOP_LEFT}
        className="toastify-container"
        toastClassName="toastify-toast"
      />
      <Particles style={{ filter: "blur(1px)" }} className="particles-js" />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
