import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import "../../../assets/scss/MenuTransaction.scss";
function MenuTransaction() {
  const items = [
    {
      key: "/recent",
      icon: <HomeOutlined />,
      label: <Link to="/transaction/recent">Recent</Link>,
    },
    {
      key: "/expense",
      icon: <HomeOutlined />,
      label: <Link to="/transaction/expense">Expense</Link>,
    },
    {
      key: "/income",
      icon: <HomeOutlined />,
      label: <Link to="/transaction/income">Income</Link>,
    },
    {
      key: "/recurring",
      icon: <HomeOutlined />,
      label: <Link to="/transaction/recurring">Recurring</Link>,
    },
  ];

  const location = useLocation();

  return (
    <div className="menu-transaction">
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={items}
        className="menu--custom"
      />
    </div>
  );
}
export default MenuTransaction;
