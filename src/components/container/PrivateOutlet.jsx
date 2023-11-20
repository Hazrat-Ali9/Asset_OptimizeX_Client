import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../services/localStorageService";


export default function PrivateOutlet() {
    const {access_token} = getToken()

  return access_token ? <Outlet/> : <Navigate to="/user/login" />;
}