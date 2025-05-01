import { useEffect, useState } from "react";
import { Button, Divider, Spin, Row, Col, Card } from "antd";
import { useParams } from "react-router-dom";
import CustomPieChart from "./CustomPieChart";
import { getGoalById } from "../../../services/GoalsSavingService";
import { getTransactionByUser } from "../../../services/TransactionService";
import { getCookie } from "../../../helpers/cookie";
import { formatDateTime } from "../../../helpers/formatDateTime";
import "./GoalDetail.scss";

function GoalDetail() {
  const { id } = useParams();
  const [goal, setGoal] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = getCookie("id");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const goalRes = await getGoalById(id);
        const transRes = await getTransactionByUser(userId);
        const transByGoal = transRes.filter(
          (item) => item.goalId != null && String(item.goalId) === String(id)
        );
        setGoal(goalRes);
        setTransactions(transByGoal || []);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết mục tiêu:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading || !goal) {
    return <Spin tip="Đang tải chi tiết..." />;
  }

  const percent = (goal.currentAmount / goal.targetAmount) * 100;

  return (
    <Card className="goal-detail-card">
      <Row gutter={32}>
        <Col md={10} xs={24} className="goal-detail__left">
          <h3 className="goal-detail__title">{goal.goalName}</h3>
          <div className="goal-detail__date">
            {formatDateTime(new Date(goal.deadline))}
          </div>

          <div className="goal-detail__stats">
            <div className="stat">
              <span className="label">Tiết kiệm hiện tại</span>
              <span className="value orange">
                {goal.currentAmount.toLocaleString("vi-VN")} VND
              </span>
            </div>
            <div className="stat">
              <span className="label">Mục tiêu</span>
              <span className="value">
                {goal.targetAmount.toLocaleString("vi-VN")} VND
              </span>
            </div>
            <div className="stat">
              <span className="label">Tỉ lệ hoàn thành</span>
              <span className="value">{percent.toFixed(2)}%</span>
            </div>
            <div className="stat">
              <span className="label">Thời gian kết thúc</span>
              <span className="value">
                {new Date(goal.deadline).toLocaleDateString("vi-VN")}
              </span>
            </div>
            <div className="stat">
              <span className="label">Tình trạng</span>
              <span className="value">Đang hoạt động</span>
            </div>
          </div>

          <Divider />
          <CustomPieChart percent={percent} />
        </Col>

        <Col md={14} xs={24}>
          <h4>Danh sách giao dịch</h4>
          <ul className="transaction-list">
            {transactions.map((t, i) => (
              <li key={i} className="transaction-item">
                <div
                  className="icon"
                  dangerouslySetInnerHTML={{ __html: t.iconUrl }}
                />
                <div className="info">
                  <div className="name">{t.name}</div>
                  <div className="note">{t.note}</div>
                </div>
                <div className="amount">
                  {t.amount >= 0 ? "+" : "-"}{" "}
                  {Math.abs(t.amount).toLocaleString("vi-VN")}đ
                </div>
              </li>
            ))}
          </ul>

          <div className="goal-detail__buttons">
            <Button className="edit-btn">Chỉnh sửa</Button>
            <Button type="primary">Lưu</Button>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default GoalDetail;
