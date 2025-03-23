import { Form, Input, Button, Card, Typography } from "antd";
import {
  CalendarOutlined,
  FormOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import "../../assets/scss/DetailModalTransaction.scss";
function DetailModalTransaction() {
  const transactionData = {
    id: "123456",
    category: "Mua quần áo",
    amount: "200,000 VND",
    date: "Thứ 5, 20 tháng 3 2025",
    paymentMethod: "Chuyển khoản",
  };
  return (
    <>
      <Card title="Transaction" className="transaction-card">
        <Typography.Text className="transaction-id">
          ID: {transactionData.id}
        </Typography.Text>

        <Typography.Title level={5} className="section-title">
          INFORMATION
        </Typography.Title>

        <div className="transaction-info">
          <div className="info-item">
            <Typography.Text strong>Category:</Typography.Text>
            <Typography.Text>{transactionData.category}</Typography.Text>
          </div>

          <div className="info-item">
            <Typography.Text strong>Số tiền:</Typography.Text>
            <Typography.Text>{transactionData.amount}</Typography.Text>
          </div>

          <div className="info-item">
            <Typography.Text strong>Ngày:</Typography.Text>
            <Typography.Text>
              <CalendarOutlined /> {transactionData.date}
            </Typography.Text>
          </div>
        </div>

        <Button block className="recurring-button">
          RECURRING
        </Button>

        <Typography.Title level={5} className="section-title">
          PAYMENT
        </Typography.Title>

        <div className="info-item">
          <Typography.Text strong>Payment by:</Typography.Text>
          <Typography.Text>{transactionData.paymentMethod}</Typography.Text>
        </div>

        <Button icon={<PlusOutlined />} block className="add-image-button">
          Thêm hình ảnh
        </Button>
      </Card>
    </>
  );
}
export default DetailModalTransaction;
