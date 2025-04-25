// BudgetItem.jsx
import { Progress } from "antd";
import useInViewAnimation from "../../../hooks/useInViewAnimation";

function BudgetItem(props) {
    const { item, index } = props;
  const [ref, animationClass] = useInViewAnimation("animate__fadeInUp");

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div
      ref={ref}
      className={`budget-dashboard__content ${animationClass}`}
      style={{
        animationDelay: `${index * 100}ms`,
        animationDuration: "0.8s",
      }}
    >
      <div className="budget-dashboard__content--name">{item.budgetName}</div>

      <div className="budget-dashboard__content--row">
        <div className="budget-dashboard__content--image">
          <img />
        </div>

        <div className="budget-dashboard__content--progress">
          <div className="budget-dashboard__content--top">
            <span>{formatDate(item.startDate)}</span>
            <span>{formatDate(item.endDate)}</span>
          </div>

          <div className="budget-dashboard__content--center">
            <Progress
              percent={(
                (100 * parseFloat(item.usedAmount)) /
                parseFloat(item.amountLimit)
              ).toFixed(0)}
              strokeColor="var(--primary-color)"
              trailColor="#ffffff"
              strokeWidth={14}
              showInfo={false}
            />
          </div>

          <div className="budget-dashboard__content--bottom">
            <span>{item.usedAmount}đ</span>
            <span>{item.amountLimit.toLocaleString("vi-VN")}đ</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetItem;
