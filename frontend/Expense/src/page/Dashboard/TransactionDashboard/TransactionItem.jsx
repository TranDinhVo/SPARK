import useInViewAnimation from "../../../hooks/useInViewAnimation";
import { formatDate } from "../../../helpers/formatDate";

function TransactionItem({ item, index }) {
  const [ref, animationClass] = useInViewAnimation("animate__fadeInUp");

  return (
    <li
      ref={ref}
      className={`transaction-dashboard__content--item ${animationClass}`}
      style={{
        animationDelay: `${index * 100}ms`,
        animationDuration: "0.8s",
      }}
    >
      <div className="transaction-dashboard__content--image">
        <img />
      </div>
      <div className="transaction-dashboard__content--nameAndType">
        <div className="transaction-dashboard__content--name">{item.name}</div>
        <div className="transaction-dashboard__content--type">{item.type}</div>
      </div>
      <div className="transaction-dashboard__content--amountAndTime">
        <div className="transaction-dashboard__content--amount">
          {item.amount.toLocaleString("vi-VN")}đ
        </div>
        <div className="transaction-dashboard__content--time">
          {formatDate(item.createdAt)}
        </div>
      </div>
    </li>
  );
}

export default TransactionItem;
