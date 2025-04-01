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
import "../../assets/scss/LayoutDefault.scss";
import MenuSider from "../../components/MenuSider";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

const { Footer, Sider, Content } = Layout;

function LayoutDefault() {
  const [collapse, setCollapse] = useState(false);
  const location = useLocation();

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/expense": "Expense",
    "/budget": "Budget",
    "/transaction": "Transaction",
    "/transaction/recent": "Transaction",
    "/transaction/income": "Transaction",
    "/transaction/expense": "Transaction",
    "/transaction/recurring": "Transaction",
    "/saving": "Goals / Saving",
    "/statistics": "Statistics",
  };

  const title = pageTitles[location.pathname] || "Dashboard";
  return (
    <>
      <Layout className="layout-default">
        <header className="header">
          <div
            className={"header__logo " + (collapse && "header__logo--collapse")}
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
                <h2 className="header__nav--title">{title}</h2>
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
            <Outlet />
          </Content>
        </Layout>
        {/* <Footer>Copy right @</Footer> */}
      </Layout>
    </>
  );
}

export default LayoutDefault;
