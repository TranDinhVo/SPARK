import { Table, Tag, Input, Button } from "antd";
import { FiSearch } from "react-icons/fi";
import { formatDateTime } from "../../../helpers/formatDateTime";
import { useState, useEffect } from "react";
import "./TransactionTable.scss";

function TransactionTable(props) {
  const { transactions = [], onView } = props;
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(transactions);
  const [loading, setLoading] = useState(false);

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
      title: "Chi tiết",
      key: "action",
      render: (_, record) => (
        <Button
          type="text"
          shape="circle"
          icon={<span style={{ fontSize: 18 }}>›</span>}
          onClick={() => onView(record)}
        />
      ),
    },
  ];

  return (
    <>
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
      <div className="transaction-table">
        <Table
          columns={columns}
          dataSource={filtered.map((t) => ({ ...t, key: t.id }))}
          pagination={{ pageSize: 8 }}
          bordered
          loading={loading}
        />
      </div>
    </>
  );
}

export default TransactionTable;
