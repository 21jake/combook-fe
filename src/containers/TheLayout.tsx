import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { toggleIsFirstTime } from '../modules/auth/auth.reducer';
import { ToastInfo } from '../shared/components/Toast';
import { Role } from '../shared/enum/role';
import { IAuth } from '../shared/models/auth.model';
import { RootState } from '../shared/reducers';
import { TheContent, TheSidebar, TheAside, TheFooter, TheHeader } from './index';

interface ITheLayout extends RouteComponentProps {}

const TheLayout = ({ history }: ITheLayout) => {
  const containerState = useSelector((state: RootState) => state.container);
  const { loginSuccess, token, user, isFirstTime } = useSelector(
    (state: RootState) => state.authentication
  );
  const { darkMode } = containerState;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFirstTime) {
      history.push('/info');
      dispatch(toggleIsFirstTime());
      ToastInfo("Vui lòng cập nhật mật khẩu!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstTime]);

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
