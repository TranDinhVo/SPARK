import { InfoCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Button, Modal, Card, Typography, Tag } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
const { Text, Title } = Typography;

import "./te.scss";
function DetailTransaction(props) {
  const { record } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
          <div className="detail__transaction-info">
            <div className="detail-item">
              <Text strong>Danh mục:</Text>
              <Text>{record.category}</Text>
            </div>
            <div className="detail-item">
              <Text strong>Số tiền:</Text>
              <Text>{record.amount}</Text>
            </div>

            <div className="detail-item">
              <Text strong>Ngày:</Text>
              <Text>
                <CalendarOutlined />{" "}
                {new Date(record.date).toLocaleDateString("vi-VN")}
              </Text>
            </div>
            <div className="detail-item">
              <Text strong>Giờ:</Text>
              <Text>
                <CalendarOutlined />{" "}
                {new Date(record.date).toLocaleTimeString("vi-VN")}
              </Text>
            </div>
          </div>
          {/* Hiển thị Giao dịch định kỳ nếu có */}
          {record.recurrence && record.recurrence.length > 0 ? (
            <>
              <Text strong>Giao dịch định kỳ: </Text>
              <div className="detail-item">
                <Text strong>Ngày tiếp theo:</Text>
                <Text>
                  {new Date(record.recurrence.next_date).toLocaleDateString(
                    "vi-VN"
                  )}
                </Text>
              </div>
              <div className="detail-item">
                <Text strong>Trạng thái:</Text>
                <Tag
                  color={
                    record.recurrence.status === "ACTIVE" ? "green" : "red"
                  }
                >
                  {record.recurrence.status}
                </Tag>
              </div>
            </>
          ) : (
            <Text strong>Không có giao dịch định kỳ</Text>
          )}

          <div className="detail-item">
            <Text strong>Phương thức thanh toán:</Text>
            <Text>{record.paymentMethod}</Text>
          </div>
        </Card>
      </Modal>
    </>
  );
}

export default DetailTransaction;
