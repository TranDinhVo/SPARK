import { Button, Layout } from "antd";
import { SunOutlined } from "@ant-design/icons";
import logoBasic from "../../assets/images/LogoBasic.png";
import "../../assets/scss/LayoutIntroduce.scss";
import Login from "../Login";
import SliderHome from "../../components/SliderHome";
import { useSelector } from "react-redux";
import Logout from "../Logout";
import { getCookie } from "../../helpers/cookie";

const { Content } = Layout;

function Introduce() {
  const token = getCookie("token");
  console.log(token);
  const isLogin = useSelector((state) => state.loginReducer);
  return (
    <>
      <Layout className="layout-introduce">
        <header className="header">
          <div className="header__nav">
            <ul className="header__nav--left">
              <li className="header__nav--item">Home</li>
              <li className="header__nav--item">Feature</li>
              <li className="header__nav--item">Screenshort</li>
              <li className="header__nav--item">Help center</li>
              <li className="header__nav--item">
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
              </li>
            </ul>
            <div className="header__nav--right">
              <div className="header__nav--language">LANGUAGE</div>
              <div className="header__nav--icon">ioc</div>
            </div>
          </div>
          <div className="header__bottom">
            <div className="header__bottom--logo">
              <img src={logoBasic} alt="logo-basic" />
            </div>
            <div className="header__login">
              <Login />
            </div>
          </div>
        </header>
        <Layout>
          <Content className="content">
            <div className="content__slider">{/* <SliderHome /> */}</div>
          </Content>
        </Layout>
        {/* <Footer>Copy right @</Footer> */}
      </Layout>
    </>
  );
}

export default Introduce;
