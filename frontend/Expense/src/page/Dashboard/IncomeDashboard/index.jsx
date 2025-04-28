import { useEffect, useState } from "react";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { Row, Col } from "antd";
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
import "./IncomeDashboard.scss";
import { formatDateTime } from "../../../helpers/formatDateTime";

const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];

function IncomeDashboard() {
  const [chartData, setChartData] = useState([]);
  const [totalThisWeek, setTotalThisWeek] = useState(0);
  const [percentChange, setPercentChange] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const userId = getCookie("id");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // const result = await getTransactionByUser(userId);
      const result = [
        { type: "Thu", amount: 50000, createdAt: "2025-04-22T08:30:00Z" },
        { type: "Thu", amount: 70000, createdAt: "2025-04-23T10:00:00Z" },
        { type: "Thu", amount: 30000, createdAt: "2025-04-24T09:45:00Z" },
        { type: "Thu", amount: 60000, createdAt: "2025-04-25T14:15:00Z" },
        { type: "Thu", amount: 45000, createdAt: "2025-04-26T11:00:00Z" },
        { type: "Thu", amount: 55000, createdAt: "2025-04-27T16:30:00Z" },
        { type: "Thu", amount: 65000, createdAt: "2025-04-21T12:00:00Z" },
        { type: "Chi", amount: 20000, createdAt: "2025-04-22T10:00:00Z" },
      ];

      const thuTransactions = result.filter((t) => t.type === "Thu");

      const now = new Date();
      const current = new Date(now);

      // Tính tuần này
      const startOfThisWeek = new Date(current);
      const day =
        startOfThisWeek.getDay() === 0 ? 6 : startOfThisWeek.getDay() - 1;
      startOfThisWeek.setDate(startOfThisWeek.getDate() - day);
      const endOfThisWeek = new Date(startOfThisWeek);
      endOfThisWeek.setDate(startOfThisWeek.getDate() + 6);

      // Tính tuần trước
      const startOfLastWeek = new Date(startOfThisWeek);
      startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);
      const endOfLastWeek = new Date(startOfThisWeek);
      endOfLastWeek.setDate(startOfThisWeek.getDate() - 1);

      let totalThisWeekAmount = 0;
      let totalLastWeekAmount = 0;
      const weeklyData = new Array(7).fill(0);

      thuTransactions.forEach((t) => {
        const date = new Date(t.createdAt);

        if (date >= startOfThisWeek && date <= endOfThisWeek) {
          const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
          weeklyData[dayIndex] += t.amount;
          totalThisWeekAmount += t.amount;
        } else if (date >= startOfLastWeek && date <= endOfLastWeek) {
          totalLastWeekAmount += t.amount;
        }
      });

      const formatted = weeklyData.map((value, idx) => ({
        name: days[idx],
        value,
      }));

      setChartData(formatted);
      setTotalThisWeek(totalThisWeekAmount);

      // Tính % thay đổi
      if (totalLastWeekAmount === 0) {
        setPercentChange(0);
      } else {
        const change =
          ((totalThisWeekAmount - totalLastWeekAmount) / totalLastWeekAmount) *
          100;
        setPercentChange(Math.round(change));
      }
    };

    fetchData();
  }, [userId]);

  const isDataEmpty = totalThisWeek === 0;

  return (
    <div className="income-chart">
      <Row className="income-chart__report" gutter={16}>
        <Col span={7} className="income-chart__report--info">
          <p className="income-chart__report--title">Báo cáo thu nhập</p>
          <p className="income-chart__report--time">
            {formatDateTime(currentTime)}
          </p>
          <p className="income-chart__report--amount">
            <span>Tuần này</span>
            <span>
              <strong>{totalThisWeek.toLocaleString("vi-VN")}</strong> VND
            </span>
          </p>
          <p className="income-chart__report--percent">
            <span className="expense-chart__report--icon">
              {percentChange >= 0 ? (
                <BiSolidUpArrow size={16} />
              ) : (
                <BiSolidDownArrow size={16} />
              )}
            </span>
            <span className={percentChange >= 0 ? "up" : "down"}>
              {percentChange >= 0 ? "+" : "-"} {Math.abs(percentChange)}%
            </span>
          </p>
        </Col>

        <Col span={17} className="income-chart__report--chart">
          {isDataEmpty ? (
            <p className="income-chart__no-data">
              Không có dữ liệu thu nhập trong tuần này.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={270}>
              <BarChart data={chartData} barCategoryGap={10}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "var(--primary-color-light)" }}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid var(--primary-color-light)",
                    borderRadius: "8px",
                    boxShadow: "0 8px 24px var(--primary-color-light)",
                    fontSize: "14px",
                    color: "var(--primary-color)",
                  }}
                />
                <Bar
                  dataKey="value"
                  radius={[12, 12, 0, 0]}
                  fill="var(--primary-color)"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default IncomeDashboard;
