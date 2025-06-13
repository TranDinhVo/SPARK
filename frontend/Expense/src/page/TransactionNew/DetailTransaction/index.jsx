import {
  InfoCircleOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  DollarCircleOutlined,
  SyncOutlined,
  CreditCardOutlined,
  TagOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Button, Modal, Card, Typography, Tag, Tooltip, Spin } from "antd";
import { formatCurrency } from "../../../helpers/formatCurrency";
const { Text, Title } = Typography;
import "./DetailTransaction.scss";

const DetailTransaction = ({ record }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setLoading(true);
    setIsModalOpen(true);
    // Giả lập loading để tạo hiệu ứng mượt mà
    setTimeout(() => setLoading(false), 300);
  };

  const handleCancel = () => {
    setLoading(true);
    // Giả lập loading để tạo hiệu ứng mượt mà
    setTimeout(() => {
      setIsModalOpen(false);
      setLoading(false);
    }, 300);
  };

  return (
    <>
      <Button
        type="text"
        icon={<InfoCircleOutlined />}
        onClick={showModal}
        className="detail-transaction-btn"
      />

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width="500px"
        className="detail-transaction-modal"
        closeIcon={<CloseOutlined className="close-icon" />}
        maskClosable={false}
      >
        <Spin spinning={loading}>
          <Card 
            title={
              <Title level={4} className="modal-title">
                Thông tin giao dịch
              </Title>
            } 
            className="detail__transaction-card"
            bordered={false}
          >
            <div className="transaction-section">
              <div className="detail-item">
                <TagOutlined className="detail-icon" />
                <div className="detail-content">
                  <Text className="detail-label">Tên giao dịch</Text>
                  <Text className="detail-value">{record.name}</Text>
                </div>
              </div>
              <div className="detail-item">
                <DollarCircleOutlined className="detail-icon" />
                <div className="detail-content">
                  <Text className="detail-label">Số tiền</Text>
                  <Text className="detail-value amount">{formatCurrency(record.amount)}</Text>
                </div>
              </div>
              <div className="detail-item">
                <FileTextOutlined className="detail-icon" />
                <div className="detail-content">
                  <Text className="detail-label">Mô tả</Text>
                  <Text className="detail-value">{record.description || "Không có mô tả"}</Text>
                </div>
              </div>
              <div className="detail-item">
                <ClockCircleOutlined className="detail-icon" />
                <div className="detail-content">
                  <Text className="detail-label">Thời gian</Text>
                  <Text className="detail-value">
                    {new Date(record.createdAt).toLocaleTimeString("vi-VN")}
                  </Text>
                </div>
              </div>
              <div className="detail-item">
                <CalendarOutlined className="detail-icon" />
                <div className="detail-content">
                  <Text className="detail-label">Ngày tạo</Text>
                  <Text className="detail-value">
                    {Intl.DateTimeFormat("vi-VN", {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(record.createdAt))}
                  </Text>
                </div>
              </div>
            </div>

            {record.recurrence && (
              <div className="recurring-section">
                <Title level={5} className="recurring-title">
                  <SyncOutlined /> Giao dịch định kỳ
                </Title>
                <div className="transaction-section">
                  <div className="detail-item">
                    <SyncOutlined className="detail-icon" />
                    <div className="detail-content">
                      <Text className="detail-label">Chu kỳ</Text>
                      <Text className="detail-value">Hằng {record.recurrence.type}</Text>
                    </div>
                  </div>
                  <div className="detail-item">
                    <CalendarOutlined className="detail-icon" />
                    <div className="detail-content">
                      <Text className="detail-label">Ngày giao dịch tiếp theo</Text>
                      <Text className="detail-value">
                        {record.recurrence.nextDate
                          ? new Date(record.recurrence.nextDate).toLocaleDateString("vi-VN")
                          : "Chưa xác định"}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </Spin>
      </Modal>
    </>
  );
};

export default DetailTransaction;
