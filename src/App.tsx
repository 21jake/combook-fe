import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import { ToastSuccess } from "./shared/components/Toast";
import { RootState } from "./shared/reducers";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));
const TheAuthLayout = React.lazy(() => import("./views/auth/TheAuthLayout"));

const App = (props: any) => {
  const { t, i18n } = useTranslation();
  const { user, token } = useSelector((state: RootState) => state.authentication);
  useEffect(() => {
    if (user && token) {
      if (user.langKey) {
        i18n.changeLanguage(user.langKey);
      }

      ToastSuccess(t("anftApp.global.loginSucessfull"));
    }
  }, [user]);

  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route path="/" component={user ? TheLayout : TheAuthLayout} />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

export default App;
