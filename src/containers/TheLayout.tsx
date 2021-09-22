import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Role } from '../shared/enum/role';
import { IAuth } from '../shared/models/auth.model';
import { RootState } from '../shared/reducers';
import { TheContent, TheSidebar, TheAside, TheFooter, TheHeader } from './index';

interface ITheLayout extends RouteComponentProps {}

const TheLayout = ({ history }: ITheLayout) => {
  const containerState = useSelector((state: RootState) => state.container);
  const { loginSuccess, token, user } = useSelector((state: RootState) => state.authentication);
  const { darkMode } = containerState;

  const redirectBackUserByType = (user: IAuth) => {
    switch (user.role) {
      case Role.ADMIN:
        history.push('/users');
        break;
      case Role.TEACHER:
        history.push('/results');
        break;
      case Role.STUDENT:
        history.push('/academic');
        break;
      default:
        history.push('/login');
    }
  };

  useEffect(() => {
    if (loginSuccess && token && user) {
      redirectBackUserByType(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginSuccess, token, user]);

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
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
