import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <Result
    status="404"
    title="404"
    subTitle="Trang không tồn tại" 
    extra={<Button type="primary" onClick={handleBackHome}>Quay lại trang chủ</Button>}
  />
  );
}
export default Error404;
