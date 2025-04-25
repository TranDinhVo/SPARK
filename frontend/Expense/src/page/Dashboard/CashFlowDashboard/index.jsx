import { useEffect, useState } from "react";
import { Card } from "antd";
import { GoChevronRight } from "react-icons/go";
import { getTransactionByUser } from "../../../services/TransactionService";
import { getCookie } from "../../../helpers/cookie";
import "./CashFlowDashboard.scss";

function CashFlowDashboard() {
  const [data, setData] = useState({});
  const userId = getCookie("id");

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTransactionByUser(userId);

      const thuTransactions = result.filter(t => t.type === "Thu");
      const chiTransactions = result.filter(t => t.type === "Chi");

      const totalIncome = thuTransactions.reduce((sum, t) => sum + t.amount, 0);
      const totalExpense = chiTransactions.reduce((sum, t) => sum + t.amount, 0);

      const totalTransactions = thuTransactions.length + chiTransactions.length;
      const averageDailyIncome = totalIncome / 30;  // Giả sử tháng 30 ngày
      const averageDailyExpense = totalExpense / 30;  // Giả sử tháng 30 ngày

      const averageTransactionIncome = totalIncome / thuTransactions.length || 0;
      const averageTransactionExpense = totalExpense / chiTransactions.length || 0;

      setData({
        totalIncome,
        totalExpense,
        totalTransactions,
        averageDailyIncome,
        averageDailyExpense,
        averageTransactionIncome,
        averageTransactionExpense,
      });
    };

    fetchData();
  }, [userId]);

  return (
    <Card className="cashflow-dashboard" bordered={false}>
      <div className="cashflow-dashboard__header">
        <h4>Dòng tiền</h4>
        <span className="cashflow-dashboard__more">
          Xem thêm <GoChevronRight />
        </span>
      </div>

      <table className="cashflow-dashboard__table">
        <thead>
          <tr>
            <th>T4/2025</th>
            <th>Thu nhập</th>
            <th>Chi phí</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tổng cộng</td>
            <td>{data.totalIncome ? data.totalIncome.toLocaleString("vi-VN") : 0} đ</td>
            <td>{data.totalExpense ? data.totalExpense.toLocaleString("vi-VN") : 0} đ</td>
          </tr>
          <tr>
            <td>Các giao dịch</td>
            <td>{data.totalTransactions ? data.totalTransactions : 0}</td>
            <td>{data.totalTransactions ? data.totalTransactions : 0}</td>
          </tr>
          <tr>
            <td>Trung bình (Ngày)</td>
            <td>{data.averageDailyIncome ? data.averageDailyIncome.toLocaleString("vi-VN") : 0} đ</td>
            <td>{data.averageDailyExpense ? data.averageDailyExpense.toLocaleString("vi-VN") : 0} đ</td>
          </tr>
          <tr>
            <td>Trung bình (Các giao dịch)</td>
            <td>{data.averageTransactionIncome ? data.averageTransactionIncome.toLocaleString("vi-VN") : 0} đ</td>
            <td>{data.averageTransactionExpense ? data.averageTransactionExpense.toLocaleString("vi-VN") : 0} đ</td>
          </tr>
          <tr>
            <td>Tổng cộng:</td>
            <td>{data.totalIncome ? data.totalIncome.toLocaleString("vi-VN") : 0} đ</td>
            <td>{data.totalExpense ? data.totalExpense.toLocaleString("vi-VN") : 0} đ</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}

export default CashFlowDashboard;
