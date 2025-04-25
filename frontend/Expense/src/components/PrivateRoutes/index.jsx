import {} from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";

function PrivateRoutes() {
  const token = getCookie("token");
  return <>{token ? <Outlet /> : <Navigate to="/gioi-thieu" />}</>;
}
export default PrivateRoutes;
