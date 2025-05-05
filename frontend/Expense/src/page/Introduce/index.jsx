import { Button, Layout, Row, Col } from "antd";
import { SunOutlined } from "@ant-design/icons";
import logoBasic from "../../assets/images/LogoBasic.png";
import logoSpark from "../../assets/images/logoSpark.png";
import "../../assets/scss/Introduce.scss";
import Login from "../Login";
import { useSelector } from "react-redux";
import { getCookie } from "../../helpers/cookie";
import logoSvg from "../../assets/images/logotest.svg?raw";
import web1 from "../../assets/images/web-1.png";
import web2 from "../../assets/images/web-2.png";
import FeatureShowcase from "./FeatureShowcase";

const { Content } = Layout;

function Introduce() {
  const token = getCookie("token");
  // console.log(token);
  const isLogin = useSelector((state) => state.loginReducer);
  return (
    <>
      <Layout className="layout-introduce">
        <header className="header">
          <div className="header__nav">
            <div className="header__nav--left">
              <div className="header__nav--logo">
                <div
                  className="logo-svg"
                  dangerouslySetInnerHTML={{ __html: logoSvg }}
                />
              </div>
              <div className="header__nav--content">
                <h2>SPARK</h2>
                <p>Quản Lí Chi Tiêu Cá Nhân</p>
              </div>
            </div>
            <ul className="header__nav--center">
              <li className="header__nav--item">Trang chủ</li>
              <li className="header__nav--item">Tính năng</li>
              <li className="header__nav--item">Tiện ích</li>
              <li className="header__nav--item">Hỗ trợ</li>
            </ul>
            <div className="header__nav--right">
              <div className="header__login">
                <Login />
              </div>
            </div>
          </div>
        </header>
        <Layout>
          <Content className="content">
            <div className="spark-home">
              <div className="spark-container">
                <Row gutter={[20, 20]} className="spark-home__wrap">
                  <Col
                    xl={10}
                    lg={10}
                    md={24}
                    sm={24}
                    xs={24}
                    className="spark-home__wrap--content"
                  >
                    <h2 className="spark-home__wrap--title">
                      Tiết kiệm chi tiêu thông minh hơn. Tất cả chỉ trong vài
                      bước đơn giản!
                    </h2>
                    <p className="spark-home__wrap--desc">
                      Chúng tôi cam kết mang đến giải pháp quản lý tài chính an
                      toàn, dễ dùng, giúp bạn kiểm soát chi tiêu và xây dựng
                      tương lai vững chắc.
                    </p>
                  </Col>

                  <Col
                    xl={14}
                    lg={14}
                    md={24}
                    sm={24}
                    xs={24}
                    className="spark-home__wrap--image"
                  >
                    <div className="spark-home__wrap--image-under">
                      <img src={web1} alt="trang - chu" />
                    </div>
                    <div className="spark-home__wrap--image-above">
                      <img src={web2} alt="trang - chu2" />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="spark-feature">
              <div className="spark-container">
                <FeatureShowcase />
              </div>
            </div>
          </Content>
        </Layout>
        {/* <Footer>Copy right @</Footer> */}
      </Layout>
    </>
  );
}

export default Introduce;
