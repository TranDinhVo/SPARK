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
      const result = await getTransactionByUser(userId);

      const thuTransactions = result.filter((t) => t.type === "Thu");

      const now = new Date();
      const currentDay = now.getDay(); // Chủ nhật = 0
      const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;

      const startOfThisWeek = new Date(now);
      startOfThisWeek.setDate(now.getDate() + diffToMonday);
      startOfThisWeek.setHours(0, 0, 0, 0);

      const endOfThisWeek = new Date(startOfThisWeek);
      endOfThisWeek.setDate(startOfThisWeek.getDate() + 6);
      endOfThisWeek.setHours(23, 59, 59, 999);

      const startOfLastWeek = new Date(startOfThisWeek);
      startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);

      const endOfLastWeek = new Date(startOfThisWeek);
      endOfLastWeek.setDate(startOfThisWeek.getDate() - 1);
      endOfLastWeek.setHours(23, 59, 59, 999);

      let totalThisWeekAmount = 0;
      let totalLastWeekAmount = 0;
      const weeklyData = new Array(7).fill(0);

      thuTransactions.forEach((t) => {
        const date = new Date(t.createdAt);
        const dateOnly = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );

        if (dateOnly >= startOfThisWeek && dateOnly <= endOfThisWeek) {
          const dayIndex = dateOnly.getDay() === 0 ? 6 : dateOnly.getDay() - 1;
          weeklyData[dayIndex] += t.amount;
          totalThisWeekAmount += t.amount;
        } else if (dateOnly >= startOfLastWeek && dateOnly <= endOfLastWeek) {
          totalLastWeekAmount += t.amount;
        }
      });

      const formatted = weeklyData.map((value, idx) => ({
        name: days[idx],
        value,
      }));

      setChartData(formatted);
      setTotalThisWeek(totalThisWeekAmount);

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
            <span className="income-chart__report--icon">
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
