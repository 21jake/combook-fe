import { CContainer, CFade } from "@coreui/react";
import React, { Suspense } from "react";
import Particles from "react-particles-js";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import { TheFooter, TheHeader } from "../../containers";
// routes config
import routes from "./authRoute";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
interface ITheAuthLayout extends RouteComponentProps {}

const TheAuthLayout = (props: ITheAuthLayout) => {
  const classes = `c-app c-default-layout bg_register`;
  return (
    <div className={classes}>
      <Particles style={{ filter: "blur(1px)" }} className="particles-js" />
      {/* <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
      > */}
      <div className="c-wrapper ">
        <TheHeader />
        <div className="c-body">
          <main className="c-main">
            <CContainer data-aos="fade-up">
              <Suspense fallback={loading}>
                <Switch>
                  {routes.map((route, idx) => {
                    return (
                      route.component && (
                        <Route
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          render={(props) => (
                            <CFade>
                              <route.component {...props} />
                            </CFade>
                          )}
                        />
                      )
                    );
                  })}
                  <Redirect from="/" to="/login" />
                </Switch>
              </Suspense>
            </CContainer>
          </main>

          <TheFooter />
        </div>
      </div>
    </div>
  );
};

export default React.memo(TheAuthLayout);
