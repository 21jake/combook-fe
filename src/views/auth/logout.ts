import store from "../../store";
import { reset } from "./auth.reducer";

const handleLogout = () => {
  store.dispatch(reset());
  localStorage.removeItem("authentication_token");
};
export default handleLogout;
