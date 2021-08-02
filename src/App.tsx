import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastError, ToastSuccess } from './shared/components/Toast';
import { RootState } from './shared/reducers';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));
const Login = React.lazy(() => import('./modules/auth/Login'));

const App = () => {
  const { user, token, errorMessage } = useSelector((state: RootState) => state.authentication);

  useEffect(() => {
    if (user && token) {
      ToastSuccess('Đăng nhập thành công');

      // SEND FIREBASE TOKEN TO BACKEND WHEN USER SUCCESSFULLY LOGGIN
    }
  }, [user, token]);

  useEffect(() => {
    if (errorMessage) {
      ToastError(errorMessage);
    }
  }, [errorMessage]);

  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          {/* If the user hasn't logged in,  only the login route is avaiable */}
          <Route path="/" component={user ? TheLayout : Login} />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

export default App;
