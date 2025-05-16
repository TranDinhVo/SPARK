import { useState } from "react";
import { Table, Tag, Button } from "antd";

const mockRecurring = [
  {
    id: 1,
    name: "Tiền nhà",
    type: "Chi",
    amount: 5000000,
    frequency: "Hàng tháng",
    nextDate: "2024-07-01",
    details: "Chuyển khoản cho chủ nhà.",
  },
  {
    id: 2,
    name: "Lương",
    type: "Thu",
    amount: 15000000,
    frequency: "Hàng tháng",
    nextDate: "2024-07-05",
    details: "Lương công ty ABC.",
  },
  {
    id: 3,
    name: "Tiết kiệm tự động",
    type: "Chi",
    amount: 2000000,
    frequency: "Hàng tuần",
    nextDate: "2024-06-22",
    details: "Chuyển vào tài khoản tiết kiệm.",
  },
];

function RecurringTransactionTable() {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const columns = [
    {
      title: "Tên giao dịch",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "Chi" ? "error" : "success"}>{type}</Tag>
      ),
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount, record) => (
        <span style={{ color: record.type === "Chi" ? "#ff4d4f" : "#52c41a" }}>
          {record.type === "Chi" ? "- " : "+ "}
          {Math.abs(amount).toLocaleString("vi-VN")} đ
        </span>
      ),
    },
    {
      title: "Định kỳ",
      dataIndex: "frequency",
      key: "frequency",
    },
    {
      title: "Lần tiếp theo",
      dataIndex: "nextDate",
      key: "nextDate",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
  ];

  return (
    <div className="recurring-transaction-table-container">
      <Table
        columns={columns}
        dataSource={mockRecurring.map((t) => ({ ...t, key: t.id }))}
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ padding: 12 }}>
              <strong>Chi tiết:</strong> {record.details}
            </div>
          ),
          expandedRowKeys,
          onExpand: (expanded, record) => {
            setExpandedRowKeys(expanded ? [record.key] : []);
          },
        }}
        pagination={false}
        bordered
      />
    </div>
  );
}

export default RecurringTransactionTable;
