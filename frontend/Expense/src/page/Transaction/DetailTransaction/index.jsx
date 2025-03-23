import { InfoCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Button, Modal, Card, Typography } from "antd";
import { CalendarOutlined, PlusOutlined } from "@ant-design/icons";
const { Text, Title } = Typography;

import "./te.scss";
function DetailTransaction() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const transactionData = {
    id: "123456",
    category: "Mua quần áo",
    amount: "200,000 VND",
    date: "Thứ 5, 20 tháng 3 2025",
    paymentMethod: "Chuyển khoản",
  };
  return (
    <>
      <Button
        danger
        size="small"
        icon={<InfoCircleOutlined />}
        onClick={showModal}
      />
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        closable={false}
        width="400px"
        className="custom-modal"
      >
        <Card title=" Thông tin giao dịch" className="detail__transaction-card">
          {/* <Text className="detail__transaction-id">
            ID: {transactionData.id}
          </Text> */}
          {/* <Title level={5} className="detail-title">
            Thông tin
          </Title> */}
          <div className="detail__transaction-info">
            <div className="detail-item">
              <Text strong>Danh mục:</Text>
              <Text>{transactionData.category}</Text>
            </div>
            <div className="detail-item">
              <Text strong>Số tiền:</Text>
              <Text>{transactionData.amount}</Text>
            </div>

            <div className="detail-item">
              <Text strong>Ngày:</Text>
              <Text>
                <CalendarOutlined /> {transactionData.date}
              </Text>
            </div>
          </div>
          <Text strong>Giao dịch định kì: </Text>

          <div className="detail-item">
            <Text strong>Phương thức thanh toán:</Text>
            <Text>{transactionData.paymentMethod}</Text>
          </div>
        </Card>
      </Modal>
    </>
  );
}

export default DetailTransaction;
