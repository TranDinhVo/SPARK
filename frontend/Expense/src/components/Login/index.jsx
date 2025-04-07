import { Modal, Form, Input, Button, Space } from "antd";
import { useState } from "react";
import "../../assets/scss/Login.scss";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

function Login() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleRegisterClick = () => {
    setIsRegister(true); // Chuyển sang form đăng ký
  };

  const handleLoginClick = () => {
    setIsRegister(false); // Chuyển sang form đăng nhập
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    setIsLogin(false);
  };
  const handleLogin = (e) => {
    console.log("login", e);
    setIsLogin(true);
  };
  const handleRegister = (e) => {
    console.log("register", e);
  };

  return (
    <div className="auth-form-container">
      {isLogin ? (
        <Button onClick={handleLogout} className="open-modal-btn">
          Đăng xuất
        </Button>
      ) : (
        <Button onClick={showModal} className="open-modal-btn">
          Đăng nhập
        </Button>
      )}

      <Modal
        visible={isModalVisible}
        width={850}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="auth-modal"
      >
        <div className={`container ${isRegister ? "active" : ""}`}>
          <div className="form-box login">
            <Form name="login-form" onFinish={handleLogin}>
              <h2>Đăng nhập</h2>
              <Form.Item
                name="username"
                className="input-box"
                rules={[{ required: true, message: "Xin mời nhập tài khoản!" }]}
              >
                <Input placeholder="Tài khoản" suffix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                name="password"
                className="input-box"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input
                  type="password"
                  placeholder="Mật khẩu"
                  suffix={<LockOutlined />}
                />
              </Form.Item>
              <div className="forgot-link">
                <a href="#">Forgot Password?</a>
              </div>
              <Button className="btn" htmlType="submit">
                Đăng nhập
              </Button>
              <p>hoặc đăng nhập bằng nền tảng xã hội</p>
              <div className="social-icons">
                <Space>
                  <Button icon={<GoogleOutlined />} href="#" />
                  <Button icon={<FacebookOutlined />} href="#" />
                  <Button icon={<GithubOutlined />} href="#" />
                  <Button icon={<LinkedinOutlined />} href="#" />
                </Space>
              </div>
            </Form>
          </div>

          <div className="form-box register">
            <Form name="register" onFinish={handleRegister}>
              <h2>Đăng kí</h2>
              <Form.Item
                name="username"
                className="input-box"
                rules={[{ required: true, message: "Xin mời nhập tài khoản!" }]}
              >
                <Input placeholder="Tài khoản" suffix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                name="email"
                className="input-box"
                rules={[
                  {
                    required: true,
                    message: "email không chống hoặc đã tồn tại!",
                  },
                ]}
              >
                <Input
                  type="email"
                  placeholder="Email"
                  suffix={<MailOutlined />}
                />
              </Form.Item>
              <Form.Item
                name="password"
                className="input-box"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input
                  type="password"
                  placeholder="Mật khẩu"
                  suffix={<LockOutlined />}
                />
              </Form.Item>
              <Button type="primary" className="btn" htmlType="submit">
                Register
              </Button>
              <p>hoặc đăng nhập bằng nền tảng xã hội</p>
              <div className="social-icons">
                <Space>
                  <Button icon={<GoogleOutlined />} href="#" />
                  <Button icon={<FacebookOutlined />} href="#" />
                  <Button icon={<GithubOutlined />} href="#" />
                  <Button icon={<LinkedinOutlined />} href="#" />
                </Space>
              </div>
            </Form>
          </div>

          <div className="toggle-box">
            <div className="toggle-panel toggle-left">
              <h2>Hello, Welcome!</h2>
              <p>Bạn chưa có tài khoản?</p>
              <Button
                className="btn register-btn"
                onClick={handleRegisterClick}
              >
                Register
              </Button>
            </div>

            <div className="toggle-panel toggle-right">
              <h2>Welcome Back!</h2>
              <p>Bạn đã có tài khoản?</p>
              <Button className="btn login-btn" onClick={handleLoginClick}>
                Login
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default Login;
