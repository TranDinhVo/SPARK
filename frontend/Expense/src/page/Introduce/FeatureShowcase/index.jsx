import React, { useState } from "react";
import { Row, Col } from "antd";
import {
  FileTextOutlined,
  PieChartOutlined,
  DollarOutlined,
  CalendarOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./FeatureShowcase.scss";

function FeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState("ghiChep");
  const features = {
    ghiChep: {
      title: "Ghi chép thu chi thông minh",
      description:
        "Dễ dàng tìm kiếm mọi khoản thu chi của bạn theo từng hạng mục cụ thể",
      icon: <FileTextOutlined />,
      color: "#ff8c00",
      bgColor: "#fff8e6",
      screen: (
        <div
          style={{
            width: "350px",
            height: "150px",
            overflow: "auto",
            margin: "0 auto",
          }}
        >
          <div className="feature-screen theme-orange">
            <div className="feature-screen__header">
              <h3>Thu chi thông minh</h3>
            </div>
            <div className="feature-screen__content">
              <div className="transaction-item">
                <span>Tiền nhà</span>
                <span className="expense">-5,000,000đ</span>
              </div>
              <div className="transaction-item">
                <span>Tiền lương</span>
                <span className="income">+15,000,000đ</span>
              </div>
              <div className="transaction-item">
                <span>Đi chợ</span>
                <span className="expense">-500,000đ</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    baoCao: {
      title: "Báo cáo trực quan, sinh động",
      description: "Thống kê rõ ràng, thông minh mọi khoản thu chi của bạn",
      icon: <PieChartOutlined />,
      color: "#ffc107",
      bgColor: "#fffbeb",
      screen: (
        <div className="feature-screen theme-yellow">
          <div className="feature-screen__header">
            <h3>Báo cáo sinh động</h3>
          </div>
          <div className="feature-screen__content">
            <div className="chart-container">
              <div className="chart-bar bar1"></div>
              <div className="chart-bar bar2"></div>
              <div className="chart-bar bar3"></div>
              <div className="chart-bar bar4"></div>
              <div className="chart-bar bar5"></div>
            </div>
            <div className="chart-labels">
              <span>T2</span>
              <span>T3</span>
              <span>T4</span>
              <span>T5</span>
              <span>T6</span>
            </div>
          </div>
        </div>
      ),
    },
    vayNo: {
      title: "Theo dõi vay nợ",
      description: "Ghi chép và theo dõi chặt chẽ các khoản vay nợ",
      icon: <DollarOutlined />,
      color: "#1890ff",
      bgColor: "#e6f7ff",
      screen: (
        <div className="feature-screen theme-blue">
          <div className="feature-screen__header">
            <h3>Quản lý vay nợ</h3>
          </div>
          <div className="feature-screen__content">
            <div className="transaction-item">
              <span>Cho Minh vay</span>
              <span className="income">+2,000,000đ</span>
            </div>
            <div className="transaction-item">
              <span>Nợ ngân hàng</span>
              <span className="expense">-50,000,000đ</span>
            </div>
            <div className="transaction-item">
              <span>Cho Hà vay</span>
              <span className="income">+1,500,000đ</span>
            </div>
          </div>
        </div>
      ),
    },
    tietKiem: {
      title: "Tiết kiệm nhanh chóng",
      description:
        "Dễ dàng theo dõi, thiết lập các mục tiêu tiết kiệm nhanh chóng, hiệu quả",
      icon: <CalendarOutlined />,
      color: "#52c41a",
      bgColor: "#f6ffed",
      screen: (
        <div className="feature-screen theme-green">
          <div className="feature-screen__header">
            <h3>Tiết kiệm mục tiêu</h3>
          </div>
          <div className="feature-screen__content">
            <div className="progress-item">
              <div className="progress-header">
                <span>Du lịch Đà Lạt</span>
                <span>75%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "75%" }}></div>
              </div>
            </div>
            <div className="progress-item">
              <div className="progress-header">
                <span>Mua laptop</span>
                <span>50%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "50%" }}></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    lapHan: {
      title: "Lập hạn mức chi tiêu",
      description:
        "Giúp bạn kiểm soát chi tiêu hiệu quả mà không vượt quá ngân sách",
      icon: <PieChartOutlined />,
      color: "#722ed1",
      bgColor: "#f9f0ff",
      screen: (
        <div className="feature-screen theme-purple">
          <div className="feature-screen__header">
            <h3>Hạn mức chi tiêu</h3>
          </div>
          <div className="feature-screen__content">
            <div className="progress-item">
              <div className="progress-header">
                <span>Ăn uống: 2,000,000đ</span>
                <span>80%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill danger"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>
            <div className="progress-item">
              <div className="progress-header">
                <span>Mua sắm: 1,000,000đ</span>
                <span>30%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "30%" }}></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    capNhat: {
      title: "Cập nhật chi tiêu mọi lúc, mọi nơi",
      description:
        "Phần mềm cập nhật liên tục tình trạng các khoản vay, ngân sách khi vượt quá ngưỡng an toàn",
      icon: <BellOutlined />,
      color: "#f5222d",
      bgColor: "#fff1f0",
      screen: (
        <div className="feature-screen theme-red">
          <div className="feature-screen__header">
            <h3>Cảnh báo chi tiêu</h3>
          </div>
          <div className="feature-screen__content">
            <div className="alert alert-danger">
              <p>Bạn đã vượt quá hạn mức ăn uống tháng này!</p>
            </div>
            <div className="alert alert-warning">
              <p>Bạn sắp đạt tới hạn mức mua sắm tháng này</p>
            </div>
            <div className="alert alert-success">
              <p>Hôm nay là hạn thanh toán tiền điện</p>
            </div>
          </div>
        </div>
      ),
    },
    lich: {
      title: "Thay đổi thông tin đơn giản",
      description:
        "Dễ dàng cập nhật thông tin cá nhân người dùng và bảo mật thông tin an toàn",
      icon: <UserOutlined />,
      color: "#9c27b0",
      bgColor: "#f9f0ff",
      screen: (
        <div className="feature-screen theme-purple-dark">
          <div className="feature-screen__header">
            <h3>Thông tin người dùng</h3>
          </div>
          <div className="feature-screen__content">
            <div className="user-profile">
              <div className="user-avatar"></div>
              <div className="user-info">
                <h4>Nguyễn Văn A</h4>
                <p>nguyenvana@email.com</p>
              </div>
            </div>
            <div className="user-details">
              <div className="user-detail-item">
                <span className="label">Số điện thoại</span>
                <span className="value">0123456789</span>
              </div>
              <div className="user-detail-item">
                <span className="label">Gói dịch vụ</span>
                <span className="value premium">Premium</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  };

  return (
    <div className="spark-feature__wrap">
      <div className="spark-feature__header">
        <h2>Tính năng</h2>
        <p>
          Việc quản lý tài chính trở nên tiện lợi với những tính năng đa dạng
          của chúng tôi
        </p>
      </div>

      <Row gutter={[30, 30]} className="spark-feature__content">
        {/* Left Features */}
        <Col xl={8} lg={8} md={24} sm={24} xs={24} className="feature-column">
          <div
            className={`feature-item ${
              activeFeature === "ghiChep" ? "active" : ""
            }`}
            onClick={() => setActiveFeature("ghiChep")}
          >
            <div
              className="feature-icon"
              style={{
                backgroundColor:
                  activeFeature === "ghiChep"
                    ? features.ghiChep.bgColor
                    : "#f0f0f0",
              }}
            >
              <span
                style={{
                  color:
                    activeFeature === "ghiChep"
                      ? features.ghiChep.color
                      : "#999",
                }}
              >
                {features.ghiChep.icon}
              </span>
            </div>
            <div className="feature-text">
              <h3>{features.ghiChep.title}</h3>
              <p>{features.ghiChep.description}</p>
            </div>
          </div>

          <div
            className={`feature-item ${
              activeFeature === "baoCao" ? "active" : ""
            }`}
            onClick={() => setActiveFeature("baoCao")}
          >
            <div
              className="feature-icon"
              style={{
                backgroundColor:
                  activeFeature === "baoCao"
                    ? features.baoCao.bgColor
                    : "#f0f0f0",
              }}
            >
              <span
                style={{
                  color:
                    activeFeature === "baoCao" ? features.baoCao.color : "#999",
                }}
              >
                {features.baoCao.icon}
              </span>
            </div>
            <div className="feature-text">
              <h3>{features.baoCao.title}</h3>
              <p>{features.baoCao.description}</p>
            </div>
          </div>

          <div
            className={`feature-item ${
              activeFeature === "vayNo" ? "active" : ""
            }`}
            onClick={() => setActiveFeature("vayNo")}
          >
            <div
              className="feature-icon"
              style={{
                backgroundColor:
                  activeFeature === "vayNo"
                    ? features.vayNo.bgColor
                    : "#f0f0f0",
              }}
            >
              <span
                style={{
                  color:
                    activeFeature === "vayNo" ? features.vayNo.color : "#999",
                }}
              >
                {features.vayNo.icon}
              </span>
            </div>
            <div className="feature-text">
              <h3>{features.vayNo.title}</h3>
              <p>{features.vayNo.description}</p>
            </div>
          </div>

          <div
            className={`feature-item ${
              activeFeature === "tietKiem" ? "active" : ""
            }`}
            onClick={() => setActiveFeature("tietKiem")}
          >
            <div
              className="feature-icon"
              style={{
                backgroundColor:
                  activeFeature === "tietKiem"
                    ? features.tietKiem.bgColor
                    : "#f0f0f0",
              }}
            >
              <span
                style={{
                  color:
                    activeFeature === "tietKiem"
                      ? features.tietKiem.color
                      : "#999",
                }}
              >
                {features.tietKiem.icon}
              </span>
            </div>
            <div className="feature-text">
              <h3>{features.tietKiem.title}</h3>
              <p>{features.tietKiem.description}</p>
            </div>
          </div>
        </Col>

        {/* Middle - Monitor */}
        <Col xl={8} lg={8} md={24} sm={24} xs={24} className="feature-monitor">
          <div className="monitor">
            <div className="monitor-top">
              <div className="window-controls">
                <div className="control-dot red"></div>
                <div className="control-dot yellow"></div>
                <div className="control-dot green"></div>
              </div>
              <div className="address-bar"></div>
            </div>
            <div className="monitor-screen">
              {features[activeFeature].screen}
            </div>
            <div className="monitor-bottom"></div>
            <div className="monitor-stand"></div>
          </div>
        </Col>

        {/* Right Features */}
        <Col xl={8} lg={8} md={24} sm={24} xs={24} className="feature-column">
          <div
            className={`feature-item ${
              activeFeature === "lapHan" ? "active" : ""
            }`}
            onClick={() => setActiveFeature("lapHan")}
          >
            <div
              className="feature-icon"
              style={{
                backgroundColor:
                  activeFeature === "lapHan"
                    ? features.lapHan.bgColor
                    : "#f0f0f0",
              }}
            >
              <span
                style={{
                  color:
                    activeFeature === "lapHan" ? features.lapHan.color : "#999",
                }}
              >
                {features.lapHan.icon}
              </span>
            </div>
            <div className="feature-text">
              <h3>{features.lapHan.title}</h3>
              <p>{features.lapHan.description}</p>
            </div>
          </div>

          <div
            className={`feature-item ${
              activeFeature === "capNhat" ? "active" : ""
            }`}
            onClick={() => setActiveFeature("capNhat")}
          >
            <div
              className="feature-icon"
              style={{
                backgroundColor:
                  activeFeature === "capNhat"
                    ? features.capNhat.bgColor
                    : "#f0f0f0",
              }}
            >
              <span
                style={{
                  color:
                    activeFeature === "capNhat"
                      ? features.capNhat.color
                      : "#999",
                }}
              >
                {features.capNhat.icon}
              </span>
            </div>
            <div className="feature-text">
              <h3>{features.capNhat.title}</h3>
              <p>{features.capNhat.description}</p>
            </div>
          </div>

          <div
            className={`feature-item ${
              activeFeature === "lich" ? "active" : ""
            }`}
            onClick={() => setActiveFeature("lich")}
          >
            <div
              className="feature-icon"
              style={{
                backgroundColor:
                  activeFeature === "lich" ? features.lich.bgColor : "#f0f0f0",
              }}
            >
              <span
                style={{
                  color:
                    activeFeature === "lich" ? features.lich.color : "#999",
                }}
              >
                {features.lich.icon}
              </span>
            </div>
            <div className="feature-text">
              <h3>{features.lich.title}</h3>
              <p>{features.lich.description}</p>
            </div>
          </div>

          <div
            className={`feature-item extra-feature ${
              activeFeature === "tietKiemPlus" ? "active" : ""
            }`}
            onClick={() => setActiveFeature("tietKiemPlus")}
          >
            <div
              className="feature-icon"
              style={{
                backgroundColor: "#f6ffed",
              }}
            >
              <span style={{ color: "#52c41a" }}>
                <CalendarOutlined />
              </span>
            </div>
            <div className="feature-text">
              <h3>Tiết kiệm nhanh chóng</h3>
              <p>
                Theo dõi nhanh chóng với lịch thống kê theo ngày, thống kê tạo
                nhanh giao dịch tại trang
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default FeatureShowcase;
