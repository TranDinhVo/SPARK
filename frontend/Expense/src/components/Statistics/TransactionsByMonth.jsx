import React, { useState, useEffect } from "react";
import { Card, Empty, Divider } from "antd";
import { ChevronDown } from "lucide-react";
import { formatDate } from "../../helpers/formatDateTime";
import { formatCurrency } from "../../helpers/formatCurrency";
import "./TransactionsByMonth.scss";

const TransactionsByMonth = ({ getTransactionsByMonth }) => {
  const [expandedMonths, setExpandedMonths] = useState({});
  const monthlyData = getTransactionsByMonth();

  useEffect(() => {
    const initialState = {};
    monthlyData.forEach(month => {
      initialState[month.monthKey] = true; // Mặc định mở tất cả
    });
    setExpandedMonths(initialState);
  }, [getTransactionsByMonth]);

  const toggleMonth = (monthKey) => {
    setExpandedMonths(prev => ({
      ...prev,
      [monthKey]: !prev[monthKey]
    }));
  };

  const renderTransactionsByMonth = () => {
    if (!monthlyData.length) return <Empty description="Không có dữ liệu" />;

    return (
      <div className="statis-transactions-by-month">
        {monthlyData.map((monthData, monthIndex) => (
          <div key={monthData.monthKey} className="statis-month-group">
            <div className="statis-month-header" onClick={() => toggleMonth(monthData.monthKey)}>
              <h3 className="statis-month-title">{monthData.monthName}</h3>
              <div className="statis-month-summary">
                <span className="statis-month-income">
                  Thu: {formatCurrency(monthData.totalIncome)}
                </span>
                <span className="statis-month-expense">
                  Chi: {formatCurrency(monthData.totalExpense)}
                </span>
                <span className={`statis-month-net ${monthData.netAmount >= 0 ? 'statis-positive' : 'statis-negative'}`}>
                  Ròng: {formatCurrency(monthData.netAmount)}
                </span>
              </div>
              <div className="statis-month-toggle">
                <ChevronDown
                  size={20}
                  className={`statis-toggle-icon ${expandedMonths[monthData.monthKey] ? 'expanded' : ''}`}
                />
              </div>
            </div>
            
            <div className={`statis-month-transactions ${expandedMonths[monthData.monthKey] ? '' : 'collapsed'}`}>
              {monthData.transactions.map((transaction, index) => (
                <div key={transaction.id || index} className="statis-transaction-item">
                  <div className="statis-transaction-info">
                    <div className="statis-transaction-title">
                      {transaction.description || transaction.category || "Giao dịch"}
                    </div>
                    <div className="statis-transaction-date">
                      {formatDate(new Date(transaction.createdAt))}
                    </div>
                  </div>
                  <div className={`statis-transaction-amount ${transaction.type === 'Thu' ? 'statis-income' : 'statis-expense'}`}>
                    {transaction.type === 'Thu' ? '+' : '-'} {formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
            
            {monthIndex < monthlyData.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card title="Giao Dịch Theo Tháng" className="statis-recent-transactions">
      {renderTransactionsByMonth()}
    </Card>
  );
};

export default TransactionsByMonth; 