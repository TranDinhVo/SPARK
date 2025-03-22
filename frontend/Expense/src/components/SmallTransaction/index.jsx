import { useEffect, useState } from "react";
import "../../assets/scss/SmallTransaction.scss";
import { Table, Button } from "antd";
import { get } from "../../utils/request";
import { ExpandOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";
import { useNavigate } from "react-router-dom";

function SmallTransaction() {
  const [dataTransaction, setDataTransaction] = useState([]);
  const useStyle = createStyles(({ css, token }) => {
    const { antCls } = token;
    return {
      customTable: css`
        ${antCls}-table {
          ${antCls}-table-container {
            ${antCls}-table-body,
            ${antCls}-table-content {
              scrollbar-width: thin;
              scrollbar-color: #ff0b0b transparent;
              scrollbar-gutter: stable;
            }
          }
        }
      `,
    };
  });
  useEffect(() => {
    const fetchApi = async () => {
      const result = await get("transactions");
      setDataTransaction(result);
    };
    fetchApi();
  }, []);
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
  ];

  const { styles } = useStyle();
  const navigate = useNavigate();
  return (
    <>
      <div className="small-transaction">
        <div className="small__list">
          <h4 className="small__list--title">Recent Transaction</h4>
          <Button
            icon={<ExpandOutlined />}
            className="small__button"
            onClick={() => navigate("/transaction")}
          >
            Detail
          </Button>
        </div>
        <div className="small__table">
          <Table
            className={styles.customTable}
            dataSource={dataTransaction}
            columns={columns}
            rowKey="id"
            pagination={false}
            scroll={{
              y: 120,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default SmallTransaction;
