import { Button, Avatar, Layout } from "antd";
import {
  UnorderedListOutlined,
  BellOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
import "./LayoutDefault.scss";
import MenuSider from "../../components/MenuSider";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import ThemeSettingContainer from "../../components/ThemeSettingContainer";
import { Menu as MenuIcon } from "lucide-react";
import Footer from "../../page/Footer";
import { getCookie } from "../../helpers/cookie";
// import { ReactComponent as Logo } from "../../assets/images/logotest.svg";
import logoSvg from "../../assets/images/logotest.svg?raw";

// import "../../assets/styles/variable.scss";
// import Logo from "../../components/Logo";

const { Sider, Content } = Layout;

function LayoutDefault() {
  const [collapse, setCollapse] = useState(false);
  const name = getCookie("fullname");
  return (
    <>
      <Layout className="layout-default">
        <header className="header">
          <div
            className={"header__logo " + (collapse && "header__logo--collapse")}
            style={{ background: "var(--primary-color)" }}
          >
            {/* <img src={logo} alt="Logo" className="header__logo--img" /> */}
            <div className="header__logo--left">
              <div className="header__logo--logo">
                <div
                  className="logo-svg"
                  dangerouslySetInnerHTML={{ __html: logoSvg }}
                />
              </div>
              <div className="header__logo--content">
                <h2>SPARK</h2>
                <p>Quản Lí Chi Tiêu Cá Nhân</p>
              </div>
            </div>
          </div>

          <div className="header__nav">
            <div className="header__wrap">
              <div className="header__nav--left">
                <div className="header__collapse">
                  <MenuIcon
                    size={38}
                    strokeWidth={4}
                    color="#fff"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setCollapse(!collapse);
                    }}
                  />
                </div>
              </div>
              <div className="header__nav--right">
                <Button
                  shape="circle"
                  className="header__nav--button"
                  size="large"
                >
                  <SearchOutlined style={{ fontSize: "20px" }} />
                </Button>

                <Button
                  shape="circle"
                  className="header__nav--button"
                  size="large"
                >
                  <SunOutlined
                    style={{
                      fontSize: "20px",
                    }}
                  />
                </Button>
                <Button
                  shape="circle"
                  className="header__nav--button"
                  size="large"
                >
                  <BellOutlined
                    style={{
                      fontSize: "20px",
                    }}
                  />
                </Button>

                <Button
                  shape="circle"
                  className="header__nav--button"
                  size="large"
                >
                  <SettingOutlined
                    style={{
                      fontSize: "20px",
                    }}
                  />
                </Button>

                <Button
                  shape="round"
                  className="header__nav--button"
                  size="large"
                >
                  <Avatar
                    icon={<UserOutlined />}
                    size={28}
                    style={{
                      fontSize: "20px",
                    }}
                  />
                  {name}
                </Button>
              </div>
            </div>
          </div>
        </header>
        <Layout className="layout-body">
          <Sider
            className="sider"
            theme="light"
            width={"20%"}
            collapsed={collapse}
            collapsedWidth={100}
          >
            <MenuSider collapse={collapse} />
          </Sider>
          <Content className="content">
            <Outlet />

            <ThemeSettingContainer />
            <Footer />
          </Content>
        </Layout>
        {/* <Footer>Copy right @</Footer> */}
      </Layout>
    </>
  );
}

export default LayoutDefault;
