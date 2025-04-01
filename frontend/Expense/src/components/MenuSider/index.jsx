import { Menu } from "antd";
import {
  AppstoreOutlined,
  PieChartOutlined,
  TransactionOutlined,
  DollarOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import "../../assets/scss/MenuSider.scss";
function MenuSider(props) {
  const { collapse } = props;
  const location = useLocation();
  const getSelectedKey = () => {
    if (location.pathname.startsWith("/transaction")) return "/transaction";
    if (location.pathname.startsWith("/budget")) return "/budget";
    if (location.pathname === "/" || location.pathname.startsWith("/dashboard"))
      return "/dashboard";
    return "";
  };

  const items = [
    {
      key: "/dashboard",
      icon: <AppstoreOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: "/budget",
      icon: <PieChartOutlined />,
      label: <Link to="/budget">Budget</Link>,
    },
    {
      key: "/transaction",
      icon: <TransactionOutlined />,
      label: <Link to="/transaction">Transaction</Link>,
    },
    {
      key: "/saving",
      icon: <DollarOutlined />,
      label: <Link to="/saving">Goals/Saving</Link>,
    },
    {
      key: "/statistics",
      icon: <BarChartOutlined />,
      label: <Link to="/statistics">Statistics</Link>,
    },
  ];
  return (
    <>
      <div className="menu-sider">
        <Menu
          mode="inline"
          items={items}
          defaultSelectedKeys={["/dashboard"]}
          defaultOpenKeys={["/dashboard"]}
          selectedKeys={[getSelectedKey()]}
          className={"menu--custom " + (collapse && "menu--collapse")}
        />
      </div>
    </>
  );
}
export default MenuSider;
