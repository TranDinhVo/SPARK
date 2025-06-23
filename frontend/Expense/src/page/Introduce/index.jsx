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
import React, { useEffect, useState } from 'react';
import SparkLandingPage from "../../components/FeatureSection/SparkLandingPage";
import FooterIntroduce from "../../components/FeatureSection/FooterIntroduce";

const { Content } = Layout;

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const headerHeight = 80;
    const elementPosition = el.offsetTop - headerHeight;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

const Introduce = () => {
  const token = getCookie("token");
  const isLogin = useSelector((state) => state.loginReducer);
  const [activeSection, setActiveSection] = useState('home-section');

  // Xử lý scroll để highlight menu item đang active
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home-section', 'feature-section', 'utility-section', 'support-section'];
      const headerHeight = 80;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= headerHeight + 50) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              <li 
                className={`header__nav--item ${activeSection === 'home-section' ? 'active' : ''}`}
                onClick={() => scrollToSection('home-section')}
              >
                Trang chủ
              </li>
              <li 
                className={`header__nav--item ${activeSection === 'feature-section' ? 'active' : ''}`}
                onClick={() => scrollToSection('feature-section')}
              >
                Tính năng
              </li>
              <li 
                className={`header__nav--item ${activeSection === 'utility-section' ? 'active' : ''}`}
                onClick={() => scrollToSection('utility-section')}
              >
                Tiện ích
              </li>
              <li 
                className={`header__nav--item ${activeSection === 'support-section' ? 'active' : ''}`}
                onClick={() => scrollToSection('support-section')}
              >
                Hỗ trợ
              </li>
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
            <section className="spark-home" id="home-section">
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
                    <h1 className="spark-home__wrap--title">
                      Tiết kiệm chi tiêu thông minh hơn. Tất cả chỉ trong vài
                      bước đơn giản!
                    </h1>
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
                      <img src={web1} alt="Giao diện chính SPARK" />
                    </div>
                    <div className="spark-home__wrap--image-above">
                      <img src={web2} alt="Tính năng quản lý chi tiêu" />
                    </div>
                  </Col>
                </Row>
              </div>
            </section>

            <section className="spark-feature" id="feature-section">
              <div className="spark-container">
                <FeatureShowcase />
              </div>
            </section>

            <section className="spark-utility" id="utility-section">
              <div className="spark-container">
                <div className="utility-content">
                  <h2>Tiện ích</h2>
                  <p>Các tính năng tiện ích sẽ được cập nhật sớm...</p>
                </div>
              </div>
            </section>
            
            <section className="spark-support" id="support-section" style={{padding: "0"}}>
              <SparkLandingPage />
            </section>
           
            <footer className="spark-footer">
              <FooterIntroduce />
            </footer>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Introduce;