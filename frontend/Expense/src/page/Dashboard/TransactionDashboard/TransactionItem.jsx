import useInViewAnimation from "../../../hooks/useInViewAnimation";
import { formatDate } from "../../../helpers/formatDate";

function TransactionItem({ item, index }) {
  const [ref, animationClass] = useInViewAnimation("animate__fadeInUp");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <li
      ref={ref}
      className={`transaction-dashboard__content--item ${animationClass}`}
      style={{
        animationDelay: `${index * 100}ms`,
        animationDuration: "0.8s",
      }}
    >
      <div
        className="transaction-dashboard__content--image"
        dangerouslySetInnerHTML={{
          __html: item.iconUrl,
        }}
      ></div>
      <div className="transaction-dashboard__content--nameAndType">
        <div className="transaction-dashboard__content--name">{item.name}</div>
        <div className="transaction-dashboard__content--type">{item.type}</div>
      </div>
      <div className="transaction-dashboard__content--amountAndTime">
        <div className="transaction-dashboard__content--amount">
          {formatCurrency(item.amount)}
        </div>
        <div className="transaction-dashboard__content--time">
          {formatDate(item.createdAt)}
        </div>
      </div>
    </li>
  );
}

export default TransactionItem;
