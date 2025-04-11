import DeleteBudget from "../ActionBudget/DeleteBudget";
import DetailBudget from "../ActionBudget/DetialBudget";
import EditBudget from "../ActionBudget/EditBudget";
import { Table, Space } from "antd";
import "./BudgetTable.scss";
import { createStyles } from "antd-style";
import { useEffect, useState } from "react";

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

function BudgetTable(props) {
  const { budgets, onReload, sortOrder } = props;
  const [dataBudgets, setDataBudgets] = useState();

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (_, __, index) => index + 1,
    },
    {
      title: "DANH MỤC",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "NGÂN SÁCH",
      dataIndex: "amountLimit",
      key: "amountLimit",
    },
    {
      title: "NGÀY BẮT ĐẦU",
      dataIndex: "startDate",
      key: "startDate",
      render: (value) => new Date(value).toLocaleDateString("vi-VN"),
    },
    {
      title: "NGÀY KẾT THÚC",
      dataIndex: "endDate",
      key: "endDate",
      render: (value) => new Date(value).toLocaleDateString("vi-VN"),
    },
    {
      title: "ĐÃ DÙNG",
      dataIndex: "amountCurrent",
      key: "percent",
      render: (amountCurrent, record) => {
        const percent = ((amountCurrent / record.amountLimit) * 100).toFixed(0);
        return `${percent}%`;
      },
    },
    {
      title: "TIỆN ÍCH",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space>
          <EditBudget record={record} />
          <DeleteBudget record={record} />
          <DetailBudget record={record} />
        </Space>
      ),
    },
  ];
  const { styles } = useStyle();
  useEffect(() => {
    let filteredData = [...budgets];
    console.log("filt", filteredData);
    if (sortOrder === "asc") {
      filteredData.sort((a, b) => b.amountLimit - a.amountLimit);
    } else if (sortOrder === "desc") {
      filteredData.sort((a, b) => a.amountLimit - b.amountLimit);
    }

    setDataBudgets(filteredData.reverse());
  }, [sortOrder, budgets]);
  console.log(dataBudgets);
  return (
    <>
      <div className="table-budget">
        <Table
          className={styles.customTable}
          columns={columns}
          dataSource={dataBudgets}
          rowKey="id"
          rowClassName={(_, index) =>
            index % 2 === 0 ? "even-budget" : "odd-budget"
          }
          size="middle"
          scroll={{ x: "100%", y: 220 }}
          pagination={false}
        />
      </div>
    </>
  );
}
export default BudgetTable;
