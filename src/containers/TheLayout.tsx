import React from "react";
import Particles from "react-particles-js";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../shared/reducers";
import { TheContent, TheFooter, TheHeader } from "./index";

interface ITheLayout extends RouteComponentProps {}

const TheLayout = (props: ITheLayout) => {
  const containerState = useSelector((state: RootState) => state.container);
  // const { loginSuccess, token } = useSelector((state: RootState) => state.authentication);
  const { darkMode } = containerState;

  // useEffect(() => {
  //   if (loginSuccess && token) {
  //     history.push("/dashboard");
  //   }
  // }, [loginSuccess]);

  const classes = `c-app c-default-layout bg_register`;

  return (
    <div className={classes}>
      <Particles style={{ filter: "blur(1px)" }} className="particles-js" />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
