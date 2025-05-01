import React from "react";
import "./TransactionCalendar.scss";

function TransactionCalendar(props) {
  const { transactions, currentMonth, currentYear } = props;
  const formatAmount = (amount) =>
    new Intl.NumberFormat("vi-VN").format(amount);

  // Lọc giao dịch đúng tháng đang xem
  const filteredTransactions = transactions.filter((tran) => {
    const date = new Date(tran.createdAt);
    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  });

  // Group theo ngày
  const groupedTransactions = filteredTransactions.reduce((acc, tran) => {
    const date = new Date(tran.createdAt);
    const dateString = date
      .toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        weekday: "short",
        timeZone: "Asia/Ho_Chi_Minh",
      })
      .replace(",", ""); // "09/04/2025 Thứ tư"

    if (!acc[dateString]) {
      acc[dateString] = [];
    }
    acc[dateString].push(tran);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => {
    const [dayA, monthA, yearA] = a.split(" ")[0].split("/").map(Number);
    const [dayB, monthB, yearB] = b.split(" ")[0].split("/").map(Number);

    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);
    return dateB - dateA; // mới → cũ
  });

  return (
    <div className="transaction-list">
      {sortedDates.map((date) => {
        const transactionsByDay = groupedTransactions[date];
        const totalAmount = transactionsByDay.reduce(
          (sum, t) => sum + (t.type === "Thu" ? t.amount : -t.amount),
          0
        );

        return (
          <div key={date} className="transaction-day">
            <div className="transaction-day-header">
              <span>{date}</span>
              <span
                className="transaction-day-total"
                style={{ color: totalAmount >= 0 ? "#28a745" : "#dc3545" }}
              >
                {totalAmount >= 0 ? "+" : "-"}
                {formatAmount(Math.abs(totalAmount))} VND
              </span>
            </div>

            {transactionsByDay.map((tran) => (
              <div key={tran.id} className="transaction-item">
                <div className="transaction-left">
                  <div
                    className="transaction-icon"
                    dangerouslySetInnerHTML={{ __html: tran.iconUrl }}
                  ></div>
                  <div className="transaction-info">
                    <p className="transaction-name">{tran.name}</p>
                    <p className="transaction-note">{tran.description}</p>
                  </div>
                </div>
                <div className="transaction-right">
                  <p
                    className="transaction-amount"
                    style={{
                      color: tran.type === "Thu" ? "#28a745" : "#dc3545",
                    }}
                  >
                    {tran.type === "Thu" ? "+" : "-"}
                    {formatAmount(Math.abs(tran.amount))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default TransactionCalendar;
