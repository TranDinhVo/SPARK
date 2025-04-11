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
// import FloatingSettingButton from "../../components/FloatingSettingButton";
// import ThemeSettingsPanel from "../../components/ThemeSettingsPanel";
// import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import ThemeSettingContainer from "../../components/ThemeSettingContainer";

import "../../assets/styles/variable.scss";

const { Sider, Content } = Layout;

function LayoutDefault() {
  const [collapse, setCollapse] = useState(false);

  const changeThemeColor = (color) => {
    document.documentElement.style.setProperty("--primary-color", color);
    localStorage.setItem("theme-color", color);
  };
  useEffect(() => {
    const savedColor = localStorage.getItem("theme-color");
    if (savedColor) {
      // document.documentElement.style.setProperty("--primary-color", savedColor);
    }
  }, []);

  return (
    <>
      <Layout className="layout-default">
        <header className="header">
          <div
            className={"header__logo " + (collapse && "header__logo--collapse")}
            style={{ background: "var(--primary-color)" }}
          >
            <img src={logo} alt="Logo" className="header__logo--img" />
          </div>

          <div className="header__nav">
            <div className="header__wrap">
              <div className="header__nav--left">
                <div className="header__collapse">
                  <UnorderedListOutlined
                    style={{ fontSize: "28px" }}
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
                  Name
                </Button>
              </div>
            </div>
          </div>
        </header>
        <Layout>
          <Sider
            className="sider"
            theme="dark"
            width={280}
            collapsed={collapse}
          >
            <MenuSider collapse={collapse} />
          </Sider>
          <Content className="content">
            {/* <Outlet /> */}
            <h6 style={{ color: "var(--primary-color-light)" }}>Tiêu đề</h6>
            <button onClick={() => changeThemeColor("red")}>Nút</button>

            <ThemeSettingContainer />
          </Content>
        </Layout>
        {/* <Footer>Copy right @</Footer> */}
      </Layout>
    </>
  );
}

export default LayoutDefault;
