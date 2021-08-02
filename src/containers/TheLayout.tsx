import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../shared/reducers';
import { TheContent, TheSidebar, TheAside, TheFooter, TheHeader } from './index';

interface ITheLayout extends RouteComponentProps {}

const TheLayout = ({ history }: ITheLayout) => {
  const containerState = useSelector((state: RootState) => state.container);
  // const { loginSuccess, token } = useSelector((state: RootState) => state.authentication);
  const { darkMode } = containerState;

  // useEffect(() => {
  //   if (loginSuccess && token) {
  //     history.push('/dashboard');
  //   }
  // }, [loginSuccess]);

  const classes = `c-app c-default-layout ${darkMode ? 'c-dark-theme' : ''}`;

  return (
    <div className={classes}>
      <TheSidebar />
      <TheAside />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        {/* <TheFooter /> */}
      </div>
    </div>
  );
};

export default TheLayout;
