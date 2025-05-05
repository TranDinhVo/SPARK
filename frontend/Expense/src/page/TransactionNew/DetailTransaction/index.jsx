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
import { formatCurrency } from "../../../helpers/formatCurrency";
const { Text } = Typography;
import "../../../assets/scss/DetailTransaction.scss";

function DetailTransaction({ record }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    console.log("chi tiet");
    setIsModalOpen(true);
  };
  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      <Button
        type="primary"
        size="small"
        icon={<InfoCircleOutlined />}
        onClick={showModal}
        style={{
          backgroundColor: "var(--primary-color-light)",
          borderColor: "var(--primary-color)",
          color: "var(--primary-color)",
        }}
      />

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width="500px"
        className="custom-modal"
        closeIcon={<CloseOutlined />}
      >
        <Card title="Thông tin giao dịch" className="detail__transaction-card">
          <div className="transaction-section">
            <div className="detail-item">
              <TagOutlined />
              <Text>{record.name}</Text>
            </div>
            <div className="detail-item">
              <DollarCircleOutlined />
              <Text>{formatCurrency(record.amount)}</Text>
            </div>
            <div className="detail-item">
              <FileTextOutlined />
              <Text>{record.description}</Text>
            </div>
            <div className="detail-item">
              <ClockCircleOutlined />
              <Text>
                {new Date(record.createdAt).toLocaleTimeString("vi-VN")}
              </Text>
            </div>
            <div className="detail-item">
              <CalendarOutlined />
              <Text>
                {Intl.DateTimeFormat("vi-VN", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(new Date(record.createdAt))}
              </Text>
            </div>
          </div>

          {record.recurrence && (
            <>
              <h4 class="recurring">
                Giao dịch định kì
                {/* <Tooltip
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
                </Tooltip> */}
              </h4>

              <div className="transaction-section">
                <div className="detail-item">
                  <SyncOutlined />
                  <div className="detail-item-content">
                    <Text>Chu kì: </Text>
                    <Text> Hằng {record.recurrence.type}</Text>
                  </div>
                </div>
                <div className="detail-item">
                  <CalendarOutlined />
                  <div className="detail-item-content">
                    <Text>Ngày giao dịch tiếp theo: </Text>
                    <Text>
                      {record.recurrence.nextDate
                        ? new Date(
                            record.recurrence.nextDate
                          ).toLocaleDateString("vi-VN")
                        : "Chưa xác định"}
                    </Text>
                  </div>
                </div>
              </div>
            </>
          )}
        </Card>
      </Modal>
    </>
  );
}

export default DetailTransaction;
