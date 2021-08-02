import store from '../../store';
import { reset } from './auth.reducer';
import { logout } from './auth.api';

const handleLogout = () => {
  store.dispatch(reset());
  store.dispatch(logout() as any);
};
export default handleLogout;
