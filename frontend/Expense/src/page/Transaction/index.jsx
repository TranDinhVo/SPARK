import { Outlet } from "react-router-dom";
import MenuTransaction from "./MenuTransaction";

function Transaction() {
  return (
    <>
      <MenuTransaction />
      <div>
        <Outlet />
      </div>
    </>
  );
}
export default Transaction;
