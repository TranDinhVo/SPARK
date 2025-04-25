import "./TransactionDashboard.scss";
import { useNavigate } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";
import { getCookie } from "../../../helpers/cookie";
import { useEffect, useState } from "react";
import { getTransactionByUser } from "../../../services/TransactionService";

function TransactionDashboard() {
  const [dataTransaction, setDataTransaction] = useState();
  const navigate = useNavigate();
  const userId = getCookie("id");

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getTransactionByUser(userId);
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const filtered = result.filter((item) => {
        const date = new Date(item.createdAt);
        return (
          date.getMonth() === currentMonth && date.getFullYear() === currentYear
        );
      });

      const sorted = filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setDataBudget(sorted);
    };
    fetchApi();
  }, []);
  console.log(dataTransaction);
  return (
    <>
      <div className="transaction-dashboard">
        <div className="transaction-dashboard__header">
          <h4 className="transaction-dashboard__header--title">Giao dịch</h4>
          <div
            className="transaction-dashboard__header--navigate"
            onClick={() => navigate("/giao-dich")}
          >
            <span>Xem thêm</span>
            <GoChevronRight />
          </div>
        </div>
      </div>
    </>
  );
}
export default TransactionDashboard;
