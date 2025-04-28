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
import "./ExpenseDashboard.scss";
import { formatDateTime } from "../../../helpers/formatDateTime";

const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];

function ExpenseDashboard() {
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
        { type: "Chi", amount: 40000, createdAt: "2025-04-21T10:00:00Z" }, // Thứ 2
        { type: "Chi", amount: 15000, createdAt: "2025-04-22T12:00:00Z" }, // Thứ 3
        { type: "Chi", amount: 10000, createdAt: "2025-04-23T09:00:00Z" }, // Thứ 4
        { type: "Chi", amount: 20000, createdAt: "2025-04-24T14:00:00Z" }, // Thứ 5
        { type: "Chi", amount: 10000, createdAt: "2025-04-25T08:00:00Z" }, // Thứ 6
        { type: "Chi", amount: 25000, createdAt: "2025-04-26T11:00:00Z" }, // Thứ 7
        { type: "Chi", amount: 30000, createdAt: "2025-04-20T15:00:00Z" }, // Chủ nhật
        { type: "Thu", amount: 100000, createdAt: "2025-04-16T10:00:00Z" },
      ];

      const chiTransactions = result.filter((t) => t.type === "Chi");

      const now = new Date();
      const current = new Date(now);

      // Tính ngày đầu tuần này
      const startOfThisWeek = new Date(current);
      const day =
        startOfThisWeek.getDay() === 0 ? 6 : startOfThisWeek.getDay() - 1;
      startOfThisWeek.setDate(startOfThisWeek.getDate() - day);
      const endOfThisWeek = new Date(startOfThisWeek);
      endOfThisWeek.setDate(startOfThisWeek.getDate() + 6);

      // Tính ngày đầu tuần trước
      const startOfLastWeek = new Date(startOfThisWeek);
      startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);
      const endOfLastWeek = new Date(startOfThisWeek);
      endOfLastWeek.setDate(startOfThisWeek.getDate() - 1);

      // Tính tổng tiền tuần này và tuần trước
      let totalThisWeekAmount = 0;
      let totalLastWeekAmount = 0;

      const weeklyData = new Array(7).fill(0);

      chiTransactions.forEach((t) => {
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

      const total = weeklyData.reduce((sum, d) => sum + d, 0);
      setTotalThisWeek(total);
      // setPercentChange(15);
      setChartData(formatted);
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
    <div className="expense-chart">
      <Row className="expense-chart__report" gutter={16}>
        <Col span={7} className="expense-chart__report--info">
          <p className="expense-chart__report--title">Báo cáo chi</p>
          <p className="expense-chart__report--time">
            {formatDateTime(currentTime)}
          </p>
          <p className="expense-chart__report--amount">
            <span>Tuần này</span>
            <span>
              <strong>{totalThisWeek.toLocaleString("vi-VN")}</strong> VND
            </span>
          </p>
          <p className="expense-chart__report--percent">
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

        <Col span={17} className="expense-chart__report--chart">
          {isDataEmpty ? (
            <p className="expense-chart__no-data">
              Không có dữ liệu chi tiêu trong tuần này.
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
                  // activeBar={{
                  //   fill: "#69c0ff",
                  //   stroke: "#40a9ff",
                  //   strokeWidth: 2,
                  // }}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default ExpenseDashboard;
