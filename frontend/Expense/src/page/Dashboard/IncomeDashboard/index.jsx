import { useEffect, useState } from "react";
import { Card } from "antd";
import { GoChevronRight } from "react-icons/go";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getTransactionByUser } from "../../../services/TransactionService";
import { getCookie } from "../../../helpers/cookie";
import "./IncomeDashboard.scss"; // CSS cho Income

const days = [
  "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"
];

function IncomeDashboard() {
  const [chartData, setChartData] = useState([]);
  const [totalThisWeek, setTotalThisWeek] = useState(0);
  const [percentChange, setPercentChange] = useState(0);
  const userId = getCookie("id");

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTransactionByUser(userId);

      // Lọc giao dịch "Thu"
      const thuTransactions = result.filter(t => t.type === "Thu");

      const now = new Date();
      const startOfWeek = now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1); // Thứ 2
      const endOfWeek = startOfWeek + 6; // Chủ nhật
      const startDate = new Date(now.setDate(startOfWeek));
      const endDate = new Date(now.setDate(endOfWeek));

      // Lọc giao dịch trong tuần này
      const weeklyData = new Array(7).fill(0); // Khởi tạo 7 ngày

      thuTransactions.forEach(t => {
        const date = new Date(t.createdAt);
        if (date >= startDate && date <= endDate) {
          const day = date.getDay(); // Lấy ngày trong tuần (0 - Chủ nhật, 1 - Thứ 2, ...)
          weeklyData[(day === 0 ? 6 : day - 1)] += t.amount; // Cộng dồn vào ngày tương ứng
        }
      });

      // Chuyển dữ liệu thành định dạng phù hợp với biểu đồ
      const formatted = weeklyData.map((value, idx) => ({
        name: days[idx],
        value,
      }));

      // Tính tổng thu trong tuần này
      const total = weeklyData.reduce((sum, d) => sum + d, 0);
      setTotalThisWeek(total);

      // Giả sử bạn có dữ liệu tuần trước để tính tỷ lệ thay đổi (set giá trị 15% tăng, ví dụ)
      setPercentChange(15);

      setChartData(formatted);
    };

    fetchData();
  }, [userId]);

  const isDataEmpty = totalThisWeek === 0;

  return (
    <Card className="income-chart" bordered={false}>
      <div className="income-chart__header">
        <h4>Báo cáo thu nhập</h4>
        <span className="income-chart__more">
          Xem thêm <GoChevronRight />
        </span>
      </div>

      <div className="income-chart__report">
        <div className="income-chart__report--info">
          <p className="income-chart__report--title">Báo cáo thu nhập</p>
          <p className="income-chart__report--time">
            {new Date().toLocaleString("vi-VN")}
          </p>
          <p className="income-chart__report--amount">
            <span>Tuần này</span>
            <strong>{totalThisWeek.toLocaleString("vi-VN")}</strong> VND
          </p>
          <p className="income-chart__report--percent">
            <span className={percentChange >= 0 ? "up" : "down"}>
              {percentChange >= 0 ? "+" : "-"} {Math.abs(percentChange)}%
            </span>
          </p>
        </div>

        <div className="income-chart__report--chart">
          {isDataEmpty ? (
            <p className="income-chart__no-data">Không có dữ liệu thu nhập trong tuần này.</p>
          ) : (
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={chartData} barCategoryGap={10}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#45c0d8" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </Card>
  );
}

export default IncomeDashboard;
