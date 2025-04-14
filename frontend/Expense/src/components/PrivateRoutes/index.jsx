import {} from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";

function PrivateRoutes() {
  const isLogin = useSelector((state) => state.loginReducer);
  const token = getCookie("token");
  console.log("isLogin", isLogin);
  return <>{token ? <Outlet /> : <Navigate to="/gioi-thieu" />}</>;
}
export default PrivateRoutes;
