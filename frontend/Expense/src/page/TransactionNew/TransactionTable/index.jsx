import { useEffect, useState } from "react";
import { Table, Tag, Input, Button, Dropdown, Menu, Space } from "antd";
import { FiSearch } from "react-icons/fi";
import { formatDateTime } from "../../../helpers/formatDateTime";
import { MoreOutlined } from "@ant-design/icons";
import "./TransactionTable.scss";
import EditTransaction from "../EditTransaction";
import DeleteTransaction from "../DeleteTransaction";
import DetailTransaction from "../DetailTransaction";

function TransactionTable({ transactions = [], onReload }) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(transactions);
  const [loading, setLoading] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  useEffect(() => {
    setLoading(true);
    const delayDebounce = setTimeout(() => {
      const keyword = search.trim().toLowerCase();
      const filteredData = transactions.filter((item) =>
        item.name.toLowerCase().includes(keyword)
      );
      setFiltered(filteredData);
      setLoading(false);
    }, 800);

    return () => clearTimeout(delayDebounce);
  }, [search, transactions]);

  const columns = [
    {
      title: "Tên giao dịch",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thể loại",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "Chi" ? "orange" : "gold"}>{type}</Tag>
      ),
    },
    {
      title: "Ngày giao dịch",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => formatDateTime(new Date(date)),
    },
    {
      title: "Khoản tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <span style={{ color: amount < 0 ? "red" : "#f97316" }}>
          {amount < 0 ? "- " : "+ "}
          {Math.abs(amount).toLocaleString("vi-VN")}
        </span>
      ),
    },
    {
      title: "hành động",
      width: "70px",
      key: "action",
      render: (_, record) => (
        <Space>
          <DeleteTransaction record={record} onReLoad={onReload} />
          <EditTransaction record={record} onReLoad={onReload} />
          <DetailTransaction record={record} />
        </Space>
      ),
    },
  ];

  return (
    <div className="transaction-table-container">
      <div className="transaction-search">
        <FiSearch className="transaction-search__icon" />
        <Input
          placeholder="Tìm kiếm ở đây"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          bordered={false}
          className="transaction-search__input"
          allowClear
        />
      </div>
      <Table
        columns={columns}
        dataSource={filtered.map((t) => ({ ...t, key: t.id }))}
        // pagination={{ pageSize: 8 }}
        pagination={false}
        bordered
        loading={loading}
        // scroll={{ y: 400 }} // chiều cao cố định
      />
    </div>
  );
}

export default TransactionTable;
