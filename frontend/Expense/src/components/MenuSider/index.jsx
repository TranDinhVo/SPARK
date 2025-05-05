import { Menu } from "antd";

import {
  LayoutGrid as LayoutGridDashboard,
  CircleDollarSign,
  Repeat,
  HandCoins,
  CalendarDays,
  PieChart as PieChartReport,
  PiggyBank,
  FileDown,
  Settings,
  Bell,
  User,
  DoorOpen,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "../../assets/scss/MenuSider.scss";
import { getCookie } from "../../helpers/cookie";

function MenuSider(props) {
  const { collapse } = props;
  const location = useLocation();
  const token = getCookie("token");

  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.startsWith("/giao-dich")) return "/giao-dich";
    if (path.startsWith("/ngan-sach")) return "/ngan-sach";
    if (path.startsWith("/tiet-kiem")) return "/tiet-kiem";
    if (path.startsWith("/khoan-vay")) return "/khoan-vay";
    if (path.startsWith("/lich")) return "/lich";
    if (path.startsWith("/bao-cao")) return "/bao-cao";
    if (path.startsWith("/tai-khoan")) return "/tai-khoan";
    if (path.startsWith("/thong-bao")) return "/thong-bao";
    if (path.startsWith("/xuat-file")) return "/xuat-file";
    if (path.startsWith("/cai-dat")) return "/cai-dat";
    if (path.startsWith("/dang-xuat")) return "/dang-xuat";
    if (path === "/") return "/dieu-khien";
    return "";
  };

  const items = [
    {
      key: "tong-quan",
      label: "Tổng quan",
      type: "group",
      children: [
        {
          key: "/dieu-khien",
          icon: <LayoutGridDashboard />,
          label: <Link to="/">Bảng điều khiển</Link>,
        },
        {
          key: "/ngan-sach",
          icon: <CircleDollarSign />,
          label: <Link to="/ngan-sach">Ngân sách</Link>,
        },
        {
          key: "/giao-dich",
          icon: <Repeat />,
          label: <Link to="/giao-dich">Giao dịch</Link>,
          // children: [
          //   {
          //     key: "/giao-dich/hang-ngay",
          //     label: <Link to="/giao-dich/hang-ngay">Giao dịch hằng ngày</Link>,
          //   },
          //   {
          //     key: "/giao-dich/dinh-ky",
          //     label: <Link to="/giao-dich/dinh-ky">Giao dịch định kì</Link>,
          //   },
          // ],
        },

        {
          key: "/tiet-kiem",
          icon: <PiggyBank />,
          label: <Link to="/tiet-kiem">Tiết kiệm</Link>,
        },
        {
          key: "/khoan-vay",
          icon: <HandCoins />,
          label: <Link to="/khoan-vay">Các khoản vay</Link>,
        },

        {
          key: "/lich",
          icon: <CalendarDays />,
          label: <Link to="/lich">Lịch</Link>,
        },
        {
          key: "/bao-cao",
          icon: <PieChartReport />,
          label: <Link to="/bao-cao">Báo cáo</Link>,
        },
      ],
    },
    {
      key: "tuy-chon-khac",
      label: "Tùy chọn khác",
      type: "group",
      children: [
        {
          key: "/tai-khoan",
          icon: <User />,
          label: <Link to="/tai-khoan">Tài khoản</Link>,
        },
        {
          key: "/thong-bao",
          icon: <Bell />,
          label: <Link to="/thong-bao">Thông báo</Link>,
        },
        {
          key: "/xuat-file",
          icon: <FileDown />,
          label: <Link to="/xuat-file">Xuất File</Link>,
        },

        {
          key: "/cai-dat",
          icon: <Settings />,
          label: <Link to="/cai-dat">Cài đặt</Link>,
        },
      ],
    },
  ];

  if (token) {
    items.push({
      key: "/dang-xuat",
      icon: <DoorOpen />,
      label: <Link to="/dang-xuat">Đăng xuất</Link>,
    });
  }
  return (
    <>
      <div className="menu-sider">
        <Menu
          mode="inline"
          items={items}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["tong-quan"]}
          selectedKeys={[getSelectedKey()]}
          className={"menu--custom " + (collapse && "menu--collapse")}
        />
        <div className="menu-sider__footer">
          <p>SPARK - Quản lí chi tiêu</p>
          <p>một cách thông minh</p>
          <p>@ 2025 All Right Reserved</p>
          <p>
            Made with by{" "}
            <span style={{ color: "var(--primary-color)" }}>SPARK</span> team
          </p>
        </div>
      </div>
    </>
  );
}
export default MenuSider;
