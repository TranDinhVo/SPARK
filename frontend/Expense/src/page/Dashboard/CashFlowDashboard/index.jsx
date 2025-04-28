import { useEffect, useState } from "react";
import { Card } from "antd";
import { GoChevronLeft, GoChevronRight } from "react-icons/go"; // Dùng icon đẹp hơn
import { getTransactionByUser } from "../../../services/TransactionService";
import { getCookie } from "../../../helpers/cookie";
import "./CashFlowDashboard.scss";

function CashFlowDashboard() {
  const [data, setData] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0 - 11
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const userId = getCookie("id");

  useEffect(() => {
    const fetchData = async () => {
      // const result = await getTransactionByUser(userId);
      const result = [
        { type: "Thu", amount: 1500000, createdAt: "2025-04-01T08:00:00Z" },
        { type: "Chi", amount: 1456000, createdAt: "2025-04-02T10:00:00Z" },
        { type: "Thu", amount: 500000, createdAt: "2025-03-10T08:00:00Z" },
        { type: "Chi", amount: 200000, createdAt: "2025-03-11T10:00:00Z" },
      ]; // Dữ liệu demo

      const thuTransactions = result.filter((t) => t.type === "Thu");
      const chiTransactions = result.filter((t) => t.type === "Chi");

      const transactionsThisMonth = [
        ...thuTransactions,
        ...chiTransactions,
      ].filter((t) => {
        const date = new Date(t.createdAt);
        return (
          date.getFullYear() === currentYear && date.getMonth() === currentMonth
        );
      });

      const thuThisMonth = transactionsThisMonth.filter(
        (t) => t.type === "Thu"
      );
      const chiThisMonth = transactionsThisMonth.filter(
        (t) => t.type === "Chi"
      );

      const totalIncome = thuThisMonth.reduce((sum, t) => sum + t.amount, 0);
      const totalExpense = chiThisMonth.reduce((sum, t) => sum + t.amount, 0);

      const averageDailyIncome = totalIncome / 30;
      const averageDailyExpense = totalExpense / 30;

      const averageTransactionIncome =
        thuThisMonth.length > 0 ? totalIncome / thuThisMonth.length : 0;
      const averageTransactionExpense =
        chiThisMonth.length > 0 ? totalExpense / chiThisMonth.length : 0;

      setData({
        totalIncome,
        totalExpense,
        incomeTransactions: thuThisMonth.length,
        expenseTransactions: chiThisMonth.length,
        averageDailyIncome,
        averageDailyExpense,
        averageTransactionIncome,
        averageTransactionExpense,
      });
    };

    fetchData();
  }, [userId, currentMonth, currentYear]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="cashflow-dashboard" bordered={false}>
      <div className="cashflow-dashboard__header">
        <h4>Dòng tiền</h4>
        {/* <span className="cashflow-dashboard__more">
          Xem thêm <GoChevronRight />
        </span> */}
      </div>

      <table className="cashflow-dashboard__table">
        <thead>
          <tr>
            <th className="cashflow-dashboard__table--datetime">
              <button className="arrow-btn" onClick={handlePrevMonth}>
                <GoChevronLeft />
              </button>
              <span>{`T${currentMonth + 1}/${currentYear}`}</span>
              <button className="arrow-btn" onClick={handleNextMonth}>
                <GoChevronRight />
              </button>
            </th>
            <th>Thu nhập</th>
            <th>Chi phí</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tổng cộng</td>
            <td>
              {data.totalIncome
                ? Math.round(data.totalIncome).toLocaleString("vi-VN")
                : 0}
              đ
            </td>
            <td>
              {data.totalExpense
                ? Math.round(data.totalExpense).toLocaleString("vi-VN")
                : 0}
              đ
            </td>
          </tr>
          <tr>
            <td>Các giao dịch</td>
            <td>{data.incomeTransactions || 0}</td>
            <td>{data.expenseTransactions || 0}</td>
          </tr>
          <tr>
            <td>Trung bình (Ngày)</td>
            <td>
              {data.averageDailyIncome
                ? Math.round(data.averageDailyIncome).toLocaleString("vi-VN")
                : 0}
              đ
            </td>
            <td>
              {data.averageDailyExpense
                ? Math.round(data.averageDailyExpense).toLocaleString("vi-VN")
                : 0}
              đ
            </td>
          </tr>
          <tr>
            <td>Trung bình (Các giao dịch)</td>
            <td>
              {data.averageTransactionIncome
                ? Math.round(data.averageTransactionIncome).toLocaleString(
                    "vi-VN"
                  )
                : 0}
              đ
            </td>
            <td>
              {data.averageTransactionExpense
                ? Math.round(data.averageTransactionExpense).toLocaleString(
                    "vi-VN"
                  )
                : 0}{" "}
              đ
            </td>
          </tr>
          <tr>
            <td>Tổng cộng:</td>
            <td
              colSpan={2}
              style={{
                fontWeight: "700",
                color: "var(--primary-color)",
                textAlign: "right",
                paddingRight: "24px",
              }}
            >
              {Math.round(
                (data.totalIncome || 0) - (data.totalExpense || 0)
              ).toLocaleString("vi-VN")}
              đ
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CashFlowDashboard;
