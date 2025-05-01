import { Card, Button, Dropdown, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import GoalStatus from "../GoalStatus";
import "./GoalCard.scss";

function GoalCard({ goal, onView, onEdit, onDelete }) {
  const percent = ((goal.currentAmount || 0) / goal.targetAmount) * 100;

  const formatCompactMoney = (amount) => {
    if (amount >= 1_000_000) {
      return (amount / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (amount >= 1_000) {
      return (amount / 1_000).toFixed(0) + "K";
    }
    return amount + "đ";
  };

  const menu = (
    <Menu
      onClick={({ key }) => {
        if (key === "view") onView(goal);
        if (key === "edit") onEdit(goal);
        if (key === "delete") onDelete(goal);
      }}
      items={[
        { key: "view", label: "Xem chi tiết" },
        { key: "edit", label: "Chỉnh sửa" },
        { key: "delete", label: "Xóa" },
      ]}
    />
  );

  return (
    <Card className="goal-card">
      <div className="goal-card__top">
        <div
          className="goal-card__icon"
          dangerouslySetInnerHTML={{ __html: goal.iconUrl }}
        ></div>
        <div className="goal-card__title">{goal.goalName}</div>
        <div className="goal-card__date">
          {new Date(goal.deadline).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
        <Button
          size="small"
          className="goal-card__button"
          onClick={() => onView(goal)}
        >
          Chi tiết
        </Button>
      </div>

      <div className="goal-card__bottom">
        <div className="goal-card__stat">
          <div className="value">
            {(goal.targetAmount / 1_000_000).toFixed(1)}M
          </div>
          <div className="label">Mục tiêu</div>
        </div>
        <div className="goal-card__stat">
          <div className="value">{percent.toFixed(1)}%</div>
          <div className="label">Tiến trình</div>
        </div>
        <div className="goal-card__stat">
          <div className="value">{formatCompactMoney(goal.currentAmount)}</div>
          <div className="label">Tiết kiệm</div>
        </div>
      </div>

      <div className="goal-card__actions">
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button
            type="text"
            icon={<EllipsisOutlined />}
            className="goal-card__more-btn"
          />
        </Dropdown>
      </div>
    </Card>
  );
}

export default GoalCard;
