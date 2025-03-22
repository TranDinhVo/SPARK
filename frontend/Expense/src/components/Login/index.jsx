import { Button, Modal } from "antd";
import { useState } from "react";
import "../../assets/scss/Login.scss";
function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal} className="login--button">
        Đăng Nhập
      </Button>
      <Modal title="Dang ki" open={isModalOpen} onCancel={handleCancel}>
        <p>hehe hehe</p>
        <p>hehe hehe</p>
        <p>hehe hehe</p>
      </Modal>
    </>
  );
}
export default Login;
