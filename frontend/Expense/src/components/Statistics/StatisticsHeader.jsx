import React, { useState } from "react";
import { DatePicker, Button, Dropdown, Menu } from "antd";
import { FileDown } from "lucide-react";
import "./StatisticsHeader.scss";

const { RangePicker } = DatePicker;

const StatisticsHeader = ({ 
  setFilteredData,
  transactions,
  calculateSummary,
  handleExport,
}) => {
  const [tempDateRange, setTempDateRange] = useState(null);

  const handleApplyFilter = () => {
    const filtered = tempDateRange && tempDateRange.length === 2
      ? transactions.filter(t => {
          const transactionDate = new Date(t.createdAt);
          return transactionDate >= tempDateRange[0].startOf('day') && transactionDate <= tempDateRange[1].endOf('day');
        })
      : transactions;
    setFilteredData(filtered);
    calculateSummary(filtered);
  };

  const handleClearFilter = () => {
    setTempDateRange(null);
    setFilteredData(transactions);
    calculateSummary(transactions);
  };
  
  const menu = (
    <Menu>
      
      <Menu.Item key="excel" onClick={e => handleExport && handleExport({ key: 'excel' })}>
        Xuất Excel
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="statis-header">
      <div className="statis-header-top">
        <div className="statis-header-content">
          <h1>Thống Kê Tài Chính</h1>
          <p>Phân tích chi tiết thu chi và xu hướng tài chính</p>
        </div>
        <div className="statis-header-actions">
          <RangePicker
            value={tempDateRange}
            onChange={setTempDateRange}
            placeholder={['Từ ngày', 'Đến ngày']}
          />
          <Button 
            type="primary" 
            onClick={handleApplyFilter}
          >
            Áp dụng
          </Button>
          <Button 
            onClick={handleClearFilter}
          >
            Xóa lọc
          </Button>
          <Dropdown overlay={menu}>
            <Button icon={<FileDown size={16} />}>
              Tải Xuống
            </Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default StatisticsHeader; 