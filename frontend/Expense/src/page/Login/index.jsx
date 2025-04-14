/* eslint-disable no-unused-vars */
import { Modal, Form, Input, Button, Space } from "antd";
import { useState } from "react";
import { deleteAllCookie, getCookie, setCookie } from "../../helpers/cookie";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "../../assets/scss/Login.scss";
import "../../assets/scss/animationSweet.scss";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { loginUser, registerUser } from "../../services/Auth";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../../store/actions/login";

function Login() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegisterClick = () => {
    setIsRegister(true);
  };

  const handleLoginClick = () => {
    setIsRegister(false);
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
    Swal.fire({
      title: "🚪 Bạn có chắc muốn đăng xuất?",
      text: "Phiên làm việc của bạn sẽ kết thúc ngay bây giờ.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đăng xuất",
      cancelButtonText: "Ở lại",
      reverseButtons: true,
      background: "linear-gradient(135deg, #fff1eb, #ace0f9)",
      color: "#2d3436",
      iconColor: "#e17055",
      // backdrop: `
      //   rgba(0, 0, 0, 0.6)
      //   url("https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjcybGIwdmE0aG93bzdxMGF6MWt0MWhrM3V2YTVsY3RmbXh0d3U2bCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YTbZzCkRQCEJa/giphy.gif")
      //   center center
      //   no-repeat
      // `,
      customClass: {
        confirmButton: "my-confirm-btn",
        cancelButton: "my-cancel-btn",
      },
      didOpen: () => {
        const style = document.createElement("style");
        style.innerHTML = `
          .my-confirm-btn {
            background-color: #d63031 !important;
            color: white !important;
            font-weight: bold;
            border-radius: 8px;
            padding: 10px 25px;
            animation: bounce 0.6s;
          }
  
          .my-cancel-btn {
            background-color: #74b9ff !important;
            color: white !important;
            font-weight: bold;
            border-radius: 8px;
            padding: 10px 25px;
            animation: bounce 0.6s;
          }
  
          @keyframes bounce {
            0%   { transform: scale(0.9); }
            50%  { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `;
        document.head.appendChild(style);

        const audio = new Audio(
          "https://assets.mixkit.co/sfx/preview/mixkit-video-game-win-2016.mp3"
        );
        audio.play();
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAllCookie();
        dispatch(checkLogin(false));
        navigate("/gioi-thieu");
      }
    });
  };
  const handleLogin = async (e) => {
    console.log(e);
    try {
      const result = await loginUser(e);
      if (result) {
        Swal.fire({
          title: "🎉 Đăng nhập thành công!",
          html: "<b>Chào mừng quay trở lại!</b><br>Hãy cùng bùng nổ nào 💥",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: "linear-gradient(135deg, #ffecb3, #ffe0b2)",
          color: "#2e7d32",
          iconColor: "#43a047",
          backdrop: `
            rgba(0,0,0,0.6)
            url("https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif")
            top left
            no-repeat
          `,
          customClass: {
            popup: "animated bounceIn super-shadow",
            title: "custom-title",
          },
          didOpen: () => {
            const audio = new Audio(
              "https://www.myinstants.com/media/sounds/mario-coin.mp3"
            );
            audio.play();
          },
        }).then(() => {
          setCookie("id", result.id, 36500);
          setCookie("fullname", result.fullname, 36500);
          setCookie("username", result.username, 36500);
          setCookie("role", result.roles, 36500);
          setCookie("token", result.token, 36500);
          dispatch(checkLogin(true));
          navigate("/");
        });
      } else {
        Swal.fire({
          position: "center-center",
          icon: "error",
          title: "Tài khoản hoặc mật khẩu không đúng",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center-center",
        icon: "error",
        title: "Tài khoản hoặc mật khẩu không đúng",
        showConfirmButton: false,
        timer: 3000,
      });
      console.error("Login error:", error);
    }
  };
  const handleRegister = async (e) => {
    try {
      const result = await registerUser(e);
      if (result) {
        Swal.fire({
          title: "🎉 Đăng ký thành công!",
          text: "Chúc mừng bạn đăng kí tài khoản thành công ❤️",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
          background: "linear-gradient(135deg, #fceabb, #f8b500)",
          color: "#2d3436",
          customClass: {
            popup: "popup-bounce",
          },
          didOpen: () => {
            const audio = new Audio(
              "https://assets.mixkit.co/sfx/preview/mixkit-game-treasure-alert-2498.mp3"
            );
            audio.play();
          },
        }).then(() => {
          form.resetFields();
          setIsRegister(false);
        });
      } else {
        Swal.fire({
          position: "center-center",
          icon: "error",
          title: "Tài khoản hoặc email đã tồn tại!",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center-center",
        icon: "error",
        title: "Tài khoản hoặc email đã tồn tại!",
        showConfirmButton: false,
        timer: 3000,
      });
      console.error("Register error:", error);
    }
    console.log(e);
  };

  const token = getCookie("token");
  const isLogin = useSelector((state) => state.loginReducer);
  // console.log("isLogin", isLogin);
  return (
    <div className="auth-form-container">
      {token ? (
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
        width={1100}
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
            <Form name="register" onFinish={handleRegister} form={form}>
              <h2>Đăng kí</h2>
              <Form.Item
                name="username"
                className="input-box"
                rules={[{ required: true, message: "Xin mời nhập tài khoản!" }]}
              >
                <Input placeholder="Tài khoản" suffix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                name="fullname"
                className="input-box"
                rules={[{ required: true, message: "Xin mời nhập Tên!" }]}
              >
                <Input placeholder="Tên" suffix={<UserOutlined />} />
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
