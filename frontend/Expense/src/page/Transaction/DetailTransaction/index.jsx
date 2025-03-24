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
import { Button, Modal, Card, Typography, Tag, Tooltip } from "antd";
const { Text } = Typography;

import "../../../assets/scss/DetailTransaction.scss";

function DetailTransaction({ record }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      <Button
        type="primary"
        size="small"
        icon={<InfoCircleOutlined />}
        onClick={showModal}
      />
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width="400px"
        className="custom-modal"
        closeIcon={<CloseOutlined />}
      >
        <Card title="Thông tin giao dịch" className="detail__transaction-card">
          <div className="transaction-section">
            <div className="detail-item">
              <TagOutlined />
              <Text>{record.category}</Text>
            </div>
            <div className="detail-item">
              <DollarCircleOutlined />
              <Text>{record.amount.toLocaleString("vi-VN")} VND</Text>
            </div>
            <div className="detail-item">
              <FileTextOutlined />
              <Text>{record.note}</Text>
            </div>
            <div className="detail-item">
              <ClockCircleOutlined />
              <Text>{new Date(record.date).toLocaleTimeString("vi-VN")}</Text>
            </div>
            <div className="detail-item">
              <CalendarOutlined />
              <Text>
                {Intl.DateTimeFormat("vi-VN", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(new Date(record.date))}
              </Text>
            </div>
          </div>

          {record.recurrence && (
            <>
              <h4 class="recurring">
                Giao dịch định kì:
                <Tooltip
                  title={record.recurrence.status.label}
                  color={
                    record.recurrence.status.code === 1
                      ? "#84ee19"
                      : record.recurrence.status.code === 0
                      ? "#f8ed08"
                      : "#ff0000"
                  }
                  placement="right"
                  overlayInnerStyle={{ color: "black" }}
                >
                  <span
                    className={`status-dot status-${record.recurrence.status.code}`}
                  ></span>
                </Tooltip>
              </h4>

              <div className="transaction-section">
                <div className="detail-item">
                  <SyncOutlined />
                  <Text>{record.recurrence.type}</Text>
                </div>
                <div className="detail-item">
                  <CalendarOutlined />
                  <Text>
                    {record.recurrence.next_date
                      ? new Date(
                          record.recurrence.next_date
                        ).toLocaleDateString("vi-VN")
                      : "Chưa xác định"}
                  </Text>
                </div>
              </div>
            </>
          )}

          <h4 className="payment">Phương thức thanh toán: </h4>
          <div className="transaction-section">
            <div className="detail-item">
              <CreditCardOutlined />
              <Text>{record.paymentMethod}</Text>
            </div>
          </div>
        </Card>
      </Modal>
    </>
  );
}

export default DetailTransaction;
