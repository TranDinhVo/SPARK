import React, { useState, useEffect, useCallback, useRef } from "react";
import { Spin, Button, Menu, Dropdown } from "antd";
import { getTransactionByUser } from "../../services/TransactionService";
import { getCookie } from "../../helpers/cookie";
import { formatDate } from "../../helpers/formatDateTime";
import { 
  StatisticsHeader, 
  SummaryCards, 
  ChartSection, 
  TransactionsByMonth 
} from "../../components/Statistics";
import { exportToPdf, exportToExcel } from "../../services/exportService";

import "./Statistics.scss";

const Statistics = () => {
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false); // trạng thái loading khi xuất file
  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [chartType, setChartType] = useState("line");
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netAmount: 0,
    transactionCount: 0,
    avgTransaction: 0,
  });
  
  const chartSectionRef = useRef(null); // Ref cho khu vực biểu đồ
  const exportRef = useRef(); // Ref cho vùng xuất PDF html2pdf.js
  const userId = getCookie("id");

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getTransactionByUser(userId);
      setTransactions(result);
      setFilteredData(result);
      calculateSummary(result);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateSummary = (data) => {
    const income = data.filter(t => t.type === "Thu").reduce((sum, t) => sum + t.amount, 0);
    const expense = data.filter(t => t.type === "Chi").reduce((sum, t) => sum + t.amount, 0);
    const net = income - expense;
    const avg = data.length > 0 ? (income + expense) / data.length : 0;

    setSummary({
      totalIncome: income,
      totalExpense: expense,
      netAmount: net,
      transactionCount: data.length,
      avgTransaction: avg,
    });
  };

  const processDataForCharts = () => {
    if (!filteredData.length) return [];

    // Nhóm dữ liệu theo ngày và sắp xếp theo thứ tự ngày
    const groupedByDate = filteredData.reduce((acc, transaction) => {
      const date = formatDate(new Date(transaction.createdAt));
      if (!acc[date]) {
        acc[date] = { 
          date, 
          income: 0, 
          expense: 0, 
          net: 0, 
          count: 0,
          timestamp: new Date(transaction.createdAt).getTime() // Thêm timestamp để sắp xếp
        };
      }
      
      if (transaction.type === "Thu") {
        acc[date].income += transaction.amount;
      } else {
        acc[date].expense += transaction.amount;
      }
      
      acc[date].net = acc[date].income - acc[date].expense;
      acc[date].count += 1;
      
      return acc;
    }, {});

    // Sắp xếp theo timestamp (ngày) từ cũ đến mới
    return Object.values(groupedByDate).sort((a, b) => a.timestamp - b.timestamp);
  };

  const processCategoryData = () => {
    const categoryStats = {};
    
    filteredData.forEach(transaction => {
      const category = transaction.name || "Khác";
      if (!categoryStats[category]) {
        categoryStats[category] = { name: category, value: 0, count: 0 };
      }
      categoryStats[category].value += transaction.amount;
      categoryStats[category].count += 1;
    });

    return Object.values(categoryStats)
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  };

  const processMonthlyData = () => {
    const monthlyStats = {};
    
    filteredData.forEach(transaction => {
      const date = new Date(transaction.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyStats[monthKey]) {
        monthlyStats[monthKey] = { 
          month: new Intl.DateTimeFormat('vi-VN', { month: 'short', year: 'numeric' }).format(date), 
          income: 0, 
          expense: 0, 
          net: 0,
          timestamp: date.getTime() // Thêm timestamp để sắp xếp
        };
      }
      
      if (transaction.type === "Thu") {
        monthlyStats[monthKey].income += transaction.amount;
      } else {
        monthlyStats[monthKey].expense += transaction.amount;
      }
      
      monthlyStats[monthKey].net = monthlyStats[monthKey].income - monthlyStats[monthKey].expense;
    });

    // Sắp xếp theo timestamp từ cũ đến mới
    return Object.values(monthlyStats).sort((a, b) => a.timestamp - b.timestamp);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    if (dates && dates.length === 2) {
      const startDate = dates[0].startOf('day');
      const endDate = dates[1].endOf('day');
      
      const filtered = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.createdAt);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
      
      setFilteredData(filtered);
      calculateSummary(filtered);
    } else {
      setFilteredData(transactions);
      calculateSummary(transactions);
    }
  };

  // Hàm mới: Nhóm giao dịch theo tháng và sắp xếp
  const getTransactionsByMonth = useCallback(() => {
    if (!filteredData.length) return [];

    // Nhóm giao dịch theo tháng
    const monthlyGroups = {};
    
    filteredData.forEach(transaction => {
      const date = new Date(transaction.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = new Intl.DateTimeFormat('vi-VN', { 
        year: 'numeric', 
        month: 'long' 
      }).format(date);
      
      if (!monthlyGroups[monthKey]) {
        monthlyGroups[monthKey] = {
          monthKey,
          monthName,
          transactions: [],
          totalIncome: 0,
          totalExpense: 0,
          netAmount: 0,
          timestamp: date.getTime() // Thêm timestamp để sắp xếp
        };
      }
      
      monthlyGroups[monthKey].transactions.push(transaction);
      
      if (transaction.type === "Thu") {
        monthlyGroups[monthKey].totalIncome += transaction.amount;
      } else {
        monthlyGroups[monthKey].totalExpense += transaction.amount;
      }
      
      monthlyGroups[monthKey].netAmount = monthlyGroups[monthKey].totalIncome - monthlyGroups[monthKey].totalExpense;
    });

    // Sắp xếp các tháng từ mới nhất đến cũ nhất
    const sortedMonths = Object.values(monthlyGroups).sort((a, b) => b.timestamp - a.timestamp);

    // Sắp xếp giao dịch trong mỗi tháng từ mới nhất đến cũ nhất và giới hạn số lượng
    sortedMonths.forEach(month => {
      month.transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    });

    return sortedMonths;
  }, [filteredData]);

  const handleExport = async ({ key }) => {
    setExporting(true);
    try {
      if (key === 'pdf') {
        await exportToPdf(filteredData, summary, chartSectionRef.current);
      } else if (key === 'excel') {
        exportToExcel(filteredData, summary);
      }
    } finally {
      setExporting(false);
    }
  };


  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <p style={{ marginTop: '20px' }}>Đang tải dữ liệu thống kê...</p>
      </div>
    );
  }

  return (
    <div className="statistics-page">
      {(loading || exporting) && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(255,255,255,0.6)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Spin size="large" tip={loading ? 'Đang tải dữ liệu thống kê...' : 'Đang xuất file...'} />
        </div>
      )}
      <StatisticsHeader 
        setFilteredData={setFilteredData}
        transactions={transactions}
        calculateSummary={calculateSummary}
        handleExport={handleExport}
      />
      <SummaryCards summary={summary} />
      <div ref={exportRef} style={{ fontFamily: "Tahoma, Arial, sans-serif" }}>
        <div ref={chartSectionRef}>
          <ChartSection 
            filteredData={filteredData}
            chartType={chartType}
            setChartType={setChartType}
            processDataForCharts={processDataForCharts}
            processCategoryData={processCategoryData}
            processMonthlyData={processMonthlyData}
          />
        </div>
        <TransactionsByMonth 
          filteredData={filteredData}
          getTransactionsByMonth={getTransactionsByMonth}
        />
      </div>
    </div>
  );
};

export default Statistics;
