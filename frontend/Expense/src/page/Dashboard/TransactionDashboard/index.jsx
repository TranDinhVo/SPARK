import "./TransactionDashboard.scss";
import { useNavigate } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";
import { getCookie } from "../../../helpers/cookie";
import { useEffect, useState } from "react";
import { getTransactionByUser } from "../../../services/TransactionService";
import {formatDate} from "../../../helpers/formatDate";
import useInViewAnimation from "../../../hooks/useInViewAnimation";
import TransactionItem from "./TransactionItem";

function TransactionDashboard() {
  const [dataTransaction, setDataTransaction] = useState([]);
  const navigate = useNavigate();
  const userId = getCookie("id");
  const [headerRef, headerClass] = useInViewAnimation("animate__fadeInDown");


  useEffect(() => {
    let isMounted = true;
    
    const fetchApi = async () => {
      try {
        const result = await getTransactionByUser(userId);
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        // const filtered = result.filter((item) => {
        //   const date = new Date(item.createdAt);
        //   return (
        //     date.getMonth() === currentMonth &&
        //     date.getFullYear() === currentYear
        //   );
        // });

        // const sorted = filtered.sort(
        //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        // );
        const sorted = result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        if (isMounted) {
          setDataTransaction(sorted);
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu giao dịch:', error);
      }
    };

    fetchApi();

    return () => {
      isMounted = false;
    };
  }, [userId]);
  

  console.log(dataTransaction);
  return (
    <>
      <div className="transaction-dashboard">
      <div
  ref={headerRef}
  className={`transaction-dashboard__header ${headerClass}`}
  style={{
    animationDuration: "0.8s",
    animationDelay: "100ms",
  }}
>
          <h4 className="transaction-dashboard__header--title">Giao dịch</h4>
          <div
            className="transaction-dashboard__header--navigate"
            onClick={() => navigate("/giao-dich")}
          >
            <span>Xem thêm</span>
            <GoChevronRight />
          </div>
        </div>
          <ul className="transaction-dashboard__content">
          {dataTransaction.length > 0 ? (
  <ul className="transaction-dashboard__content">
    {dataTransaction.map((item, index) => (
      <TransactionItem key={item.id} item={item} index={index} />
    ))}
  </ul>
) : (
  <p>Không có dữ liệu</p>
)}

          </ul>
      </div>
    </>
  );
}
export default TransactionDashboard;
