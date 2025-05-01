import { Table, Row, Col } from "antd";
import GoalCard from "../GoalCard";
import GoalStatus from "../GoalStatus";
import GoalActions from "../GoalActions";
import "./GoalsList.scss";
function GoalsList(props) {
  const { goals, viewMode, onView, onEdit, onDelete } = props;
  const columns = [
    {
      title: "Tên tiết kiệm",
      dataIndex: "goalName",
      key: "goalName",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Mục tiêu",
      dataIndex: "targetAmount",
      key: "targetAmount",
      render: (amount) => (
        <span style={{ color: "var(--primary-color)", fontWeight: "bold" }}>
          {amount?.toLocaleString("vi-VN")} VND
        </span>
      ),
    },
    {
      title: "Ngày đến hạn",
      dataIndex: "deadline",
      key: "deadline",
      render: (date) =>
        new Date(date).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      render: (status) => <GoalStatus status={status} />,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <GoalActions
          record={record}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ];

  if (viewMode === "list") {
    return (
      <Table
        columns={columns}
        dataSource={goals}
        pagination={false}
        className="saving-table"
        rowKey="id"
      />
    );
  }

  return (
    <Row gutter={[16, 16]} className="goals-grid">
      {goals.map((goal) => (
        <Col xs={24} sm={12} md={8} lg={6} key={goal.id}>
          <GoalCard
            goal={goal}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Col>
      ))}
    </Row>
  );
}

export default GoalsList;
