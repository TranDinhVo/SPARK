import { useNavigate } from "react-router-dom";
import { deleteAllCookie } from "../../helpers/cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../store/actions/login";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  deleteAllCookie();
  useEffect(() => {
    dispatch(checkLogin(false));
    navigate("/gioi-thieu");
  }, []);
  return <>{}</>;
}
export default Logout;
