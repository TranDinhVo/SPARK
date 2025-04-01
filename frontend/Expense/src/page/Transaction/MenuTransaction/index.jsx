import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  ClockCircleOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import "../../../assets/scss/MenuTransaction.scss";
import { useEffect, useState } from "react";

function MenuTransaction() {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("recent");
  useEffect(() => {
    const newKey = location.pathname.includes("/transaction/recent")
      ? "recent"
      : location.pathname.includes("/transaction/expense")
      ? "expense"
      : location.pathname.includes("/transaction/income")
      ? "income"
      : location.pathname.includes("/transaction/recurring")
      ? "recurring"
      : "recent";

    setSelectedKey(newKey);
  }, [location.pathname]);
  const items = [
    {
      key: "recent",
      icon: <ClockCircleOutlined />,
      label: <Link to="/transaction/recent">Recent</Link>,
      className: "menu-recent",
    },
    {
      key: "expense",
      icon: <MinusCircleOutlined />,
      label: <Link to="/transaction/expense">Expense</Link>,
      className: "menu-expense",
    },
    {
      key: "income",
      icon: <PlusCircleOutlined />,
      label: <Link to="/transaction/income">Income</Link>,
      className: "menu-income",
    },
    {
      key: "recurring",
      icon: <ReloadOutlined />,
      label: <Link to="/transaction/recurring">Recurring</Link>,
      className: "menu-recurring",
    },
  ];

  return (
    <div className="menu-transaction">
      <Menu
        theme="light"
        mode="horizontal"
        items={items}
        selectedKeys={[selectedKey]}
        className="menu--custom"
      />
    </div>
  );
}

export default MenuTransaction;
