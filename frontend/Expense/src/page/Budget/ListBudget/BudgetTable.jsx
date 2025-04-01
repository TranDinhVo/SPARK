import DeleteBudget from "../ActionBudget/DeleteBudget";
import DetailBudget from "../ActionBudget/DetialBudget";
import EditBudget from "../ActionBudget/EditBudget";
import { Table, Space } from "antd";
import "./BudgetTable.scss";

function BudgetTable(props) {
  const { budgets, onReload } = props;

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
  return (
    <>
      <div className="table-budget">
        <Table
          dataSource={budgets}
          columns={columns}
          rowKey="id"
          rowClassName={(_, index) =>
            index % 2 === 0 ? "even-budget" : "odd-budget"
          }
        />
      </div>
    </>
  );
}
export default BudgetTable;
