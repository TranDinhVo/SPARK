// File: Calendars.jsx
import React, { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getTransactionByUser } from "../../services/TransactionService";
import "./Calendars.scss";
import TransactionCalender from "./TransactionCalendar";

function Calendars() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [transactions, setTransactions] = useState([]);
  const userId = getCookie("id");
  const today = new Date();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const result = await getTransactionByUser(userId);
        const res = result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setTransactions(res);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, [userId]);

  const getDayTransactionTotals = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    const dateString = date.toLocaleDateString("en-CA", {
      timeZone: "Asia/Ho_Chi_Minh",
    });

    const dayTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.createdAt);
      const transactionDateString = transactionDate.toLocaleDateString(
        "en-CA",
        { timeZone: "Asia/Ho_Chi_Minh" }
      );
      return transactionDateString === dateString;
    });

    const totals = { income: 0, expense: 0 };
    dayTransactions.forEach((transaction) => {
      if (transaction.type === "Thu") {
        totals.income += Number(transaction.amount);
      } else if (transaction.type === "Chi") {
        totals.expense += Number(transaction.amount);
      }
    });

    return totals;
  };

  const formatAmount = (amount) =>
    new Intl.NumberFormat("vi-VN").format(amount);

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const getLastDayOfPrevMonth = (year, month) =>
    new Date(year, month, 0).getDate();

  const prevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const formatMonthDisplay = () => {
    const months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    const monthName = months[currentMonth];
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    return `${monthName}/${currentYear} (01/${monthName} - ${daysInMonth}/${monthName})`;
  };

  const isToday = (day) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  const generateCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const lastDayOfPrevMonth = getLastDayOfPrevMonth(currentYear, currentMonth);

    const days = [];
    let dayCounter = 1;
    let nextMonthDay = 1;

    for (let week = 0; week < 6; week++) {
      const weekRow = [];
      for (let day = 0; day < 7; day++) {
        if (week === 0 && day < firstDayOfMonth) {
          weekRow.push({
            day: lastDayOfPrevMonth - firstDayOfMonth + day + 1,
            currentMonth: false,
          });
        } else if (dayCounter <= daysInMonth) {
          weekRow.push({
            day: dayCounter,
            currentMonth: true,
            isToday: isToday(dayCounter),
          });
          dayCounter++;
        } else {
          weekRow.push({ day: nextMonthDay++, currentMonth: false });
        }
      }
      days.push(weekRow);
      if (dayCounter > daysInMonth && week >= 4) break;
    }
    return days;
  };

  const daysOfWeek = [
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
    "Chủ nhật",
  ];

  const calendarGrid = generateCalendarGrid();

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="nav-button prev" onClick={prevMonth}>
          &lt;
        </button>
        <div className="month-display">{formatMonthDisplay()}</div>
        <button className="nav-button next" onClick={nextMonth}>
          &gt;
        </button>
      </div>

      <table className="calendar">
        <thead>
          <tr>
            {daysOfWeek.map((day, idx) => (
              <th key={idx}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarGrid.map((week, weekIdx) => (
            <tr key={weekIdx}>
              {week.map((day, dayIdx) => {
                const totals = day.currentMonth
                  ? getDayTransactionTotals(day.day)
                  : { income: 0, expense: 0 };
                return (
                  <td
                    key={dayIdx}
                    className={`
                      ${day.currentMonth ? "current-month" : "other-month"}
                      ${day.isToday ? "today" : ""}
                    `}
                  >
                    <div className="date">{day.day}</div>
                    {totals.income > 0 && (
                      <div className="amount income">
                        {formatAmount(totals.income)}
                      </div>
                    )}
                    {totals.expense > 0 && (
                      <div className="amount expense">
                        {formatAmount(totals.expense)}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <TransactionCalender
          transactions={transactions}
          currentMonth={currentMonth}
          currentYear={currentYear}
        />
      </div>
    </div>
  );
}

export default Calendars;
