import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateLogin() {
  const [isLogin, setIsLogin] = useState(false);
  return <>{isLogin ? <Navigate to="/introduce" replace /> : <Outlet />}</>;
}
export default PrivateLogin;
