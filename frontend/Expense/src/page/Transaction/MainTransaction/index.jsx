import { useEffect, useState } from "react";
import { Table, Space } from "antd";
import { get } from "../../../utils/request";
import "../../../assets/scss/MainTransaction.scss";
import DeleteTransaction from "../DeleteTransaction";
import EditTransaction from "../EditTransaction";
import DetailTransaction from "../DetailTransaction/index";
import { useOutletContext } from "react-router-dom";

import { createStyles } from "antd-style";

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      .${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body ,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #feaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

function MainTransaction(props) {
  const { recurring, type, sortOrder } = props;
  const { reload } = useOutletContext();
  const [dataTransaction, setDataTransaction] = useState([]);

  const fetchApi = async () => {
    const result = await get("transactions");
    let filteredData = [];
    if (recurring === true) {
      filteredData = result.filter((item) => item.recurrence !== null);
    } else {
      filteredData = result.filter((item) => item.type === type || type === "");
    }

    if (sortOrder === "asc") {
      filteredData.sort((a, b) => b.amount - a.amount);
    } else if (sortOrder === "desc") {
      filteredData.sort((a, b) => a.amount - b.amount);
    }

    setDataTransaction(filteredData.reverse());
  };

  useEffect(() => {
    fetchApi();
  }, [sortOrder, reload]);
  const onReLoad = () => {
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
      dataIndex: ["recurrence", "type"],
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
          <EditTransaction record={record} onReLoad={onReLoad} />
          <DeleteTransaction record={record} onReLoad={onReLoad} />
          <DetailTransaction record={record} />
        </Space>
      ),
    },
  ].filter(Boolean);

  const { styles } = useStyle();
  return (
    <>
      <div className="transaction-recent">
        <div className="recent__table">
          <Table
            className={styles.customTable}
            dataSource={dataTransaction}
            columns={columns}
            rowKey="id"
            rowClassName={(_, index) =>
              index % 2 === 0 ? "even-row" : "odd-row"
            }
            pagination={false}
            scroll={{ x: "100%", y: 550 }}
          />
        </div>
      </div>
    </>
  );
}

export default MainTransaction;
