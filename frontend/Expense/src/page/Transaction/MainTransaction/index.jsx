import { useEffect, useState } from "react";
import { Table, Space } from "antd";
import { get } from "../../../utils/request";
import "../../../assets/scss/MainTransaction.scss";
import DeleteTransaction from "../DeleteTransaction";
import EditTransaction from "../EditTransaction";
import DetailTransaction from "../DetailTransaction/index";

function MainTransaction(props) {
  const { recurring, type } = props;
  const [dataTransaction, setDataTransaction] = useState([]);

  const fetchApi = async () => {
    const result = await get("transactions");
    if (recurring === true) {
      setDataTransaction(
        result.filter((item) => item.recurrence_type !== null)
      );
    } else
      setDataTransaction(
        result.filter((item) => item.type === type || type === "")
      );
  };
  useEffect(() => {
    fetchApi();
  }, []);

  const onReload = () => {
    fetchApi();
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      // width: 75,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Category",
      dataIndex: "category",
      // width: 170,
      key: "category",
    },
    {
      title: "Date",
      dataIndex: "date",
      // width: 120,
      key: "date",
      render: (value) => new Date(value).toLocaleDateString("vi-VN"),
    },
    type === "" && {
      title: "Type",
      // width: 110,
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Amount",
      // width: 90,
      dataIndex: "amount",
      key: "amount",
      render: (value) => new Intl.NumberFormat("vi-VN").format(value),
    },
    recurring === true && {
      title: "Recurring",
      dataIndex: "recurrence_type",
      key: "recurrence_type",
    },
    {
      title: "Note",
      // width: 110,
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Action",
      // width: 90,
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space>
          <DeleteTransaction record={record} onReload={onReload} />
          <EditTransaction record={record} onReload={onReload} />
          <DetailTransaction record={record} />
        </Space>
      ),
    },
  ].filter(Boolean);

  return (
    <>
      <div className="transaction-recent">
        <div className="recent__table">
          <Table dataSource={dataTransaction} columns={columns} rowKey="id" />
        </div>
      </div>
    </>
  );
}

export default MainTransaction;
