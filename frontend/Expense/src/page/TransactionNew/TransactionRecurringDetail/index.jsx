import React from "react";
import { Button, Tag, Spin, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "./TransactionRecurringDetail.scss";

function TransactionRecurringDetail(props) {
  const { data, loading, transactions = [], onEdit, onDelete } = props;
  if (loading) {
    return (
      <div className="recurring-detail__loading">
        <Spin tip="Đang tải chi tiết..." />
      </div>
    );
  }
  if (!data) {
    return (
      <div className="recurring-detail__empty">
        Chọn giao dịch định kỳ để xem chi tiết
      </div>
    );
  }

  // Lọc transaction liên quan đến recurring này
  const relatedTransactions = transactions.filter(
    (t) => t.recurringTransaction && t.recurringTransaction.id === data.id
  );

  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (v) => v.toLocaleString("vi-VN") + " đ",
    },
    {
      title: "Ngày",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (v) => dayjs(v).format("DD/MM/YYYY"),
    },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (v) => (v ? "Hoạt động" : "Ẩn"),
    },
  ];

  return (
    <div className="recurring-detail__wrapper">
      <div className="recurring-detail__header">
        <div className="recurring-detail__title">{data.name}</div>
        <div className="recurring-detail__actions">
          <Button
            icon={<EditOutlined />}
            onClick={onEdit}
            style={{ marginRight: 8 }}
          >
            Sửa
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={onDelete}>
            Xóa
          </Button>
        </div>
      </div>
      <div className="recurring-detail__info">
        <div className="recurring-detail__info--row">
          <div>
            <b>Chu kỳ:</b> <Tag color="blue">{data.type}</Tag>
          </div>
          <div>
            <b>Trạng thái:</b>
            <Tag color={data.status?.code === 1 ? "green" : "red"}>
              {data.status?.lable}
            </Tag>
          </div>
        </div>

        <div className="recurring-detail__info--row">
          <div>
            <b>Ngày bắt đầu:</b>
            <span>{dayjs(data.createAt).format("DD/MM/YYYY")}</span>
          </div>
          <div>
            <b>Ngày giao dịch tiếp theo:</b>
            <span> {dayjs(data.nextDate).format("DD/MM/YYYY")}</span>
          </div>
        </div>
      </div>
      <div
        className="recurring-detail__transaction-list"
        style={{ marginTop: 24 }}
      >
        <Table
          columns={columns}
          dataSource={relatedTransactions.map((t) => ({ ...t, key: t.id }))}
          pagination={false}
          size="small"
          locale={{ emptyText: "Không có giao dịch nào cho định kỳ này." }}
        />
      </div>
    </div>
  );
}

export default TransactionRecurringDetail;
