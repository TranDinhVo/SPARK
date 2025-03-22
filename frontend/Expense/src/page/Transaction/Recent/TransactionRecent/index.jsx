import { useEffect, useState } from "react";
import { Table } from "antd";
import { get } from "../../../../utils/request";
import "../../../../assets/scss/TransactionRecent.scss";
import DeleteTransaction from "../../DeleteTransaction";
import EditTransaction from "../../EditTransaction";

function TransactionRecent() {
  const [dataTransaction, setDataTransaction] = useState([]);
  const fetchApi = async () => {
    const result = await get("transactions");
    setDataTransaction(result);
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
    },
    {
      title: "Type",
      // width: 110,
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Total",
      // width: 90,
      dataIndex: "total",
      key: "total",
      render: (value) => new Intl.NumberFormat("vi-VN").format(value),
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
      render: (_, record) => {
        return (
          <>
            <DeleteTransaction record={record} onReload={onReload} />
            <EditTransaction record={record} onReload={onReload} />
          </>
        );
      },
    },
  ];

  //   const { styles } = useStyle();
  return (
    <>
      <div className="transaction-recent">
        <div className="recent__table">
          <Table
            dataSource={dataTransaction}
            columns={columns}
            rowKey="id"
            //     pagination={false}
          />
        </div>
      </div>
    </>
  );
}

export default TransactionRecent;
