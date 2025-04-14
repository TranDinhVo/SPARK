import { Outlet } from "react-router-dom";
import { useState } from "react";
import MenuTransaction from "./MenuTransaction";
import ActionTransaction from "./ActionTransaction";

function Transaction() {
  const [reload, setReload] = useState(false);

  const onReLoad = () => {
    setReload((prev) => !prev);
  };

  return (
    <>
      {/* <MenuTransaction />
      <ActionTransaction onReLoad={onReLoad} />
      <Outlet context={{ onReLoad, reload }} /> */}
      Transaction
    </>
  );
}

export default Transaction;
