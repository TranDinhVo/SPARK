import React from "react";
import { Row, Col, Card, Select, Empty } from "antd";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { formatCurrency } from "../../helpers/formatCurrency";
import "./ChartSection.scss";

const { Option } = Select;

const COLORS = {
  income: "#52c41a",
  expense: "#ff4d4f",
  primary: "#1890ff",
  secondary: "#722ed1",
  success: "#52c41a",
  warning: "#faad14",
  error: "#ff4d4f",
};

const CHART_COLORS = [
  "#1890ff",
  "#52c41a",
  "#faad14",
  "#ff4d4f",
  "#722ed1",
  "#13c2c2",
  "#eb2f96",
  "#fa8c16",
];

const ChartSection = ({ 
  filteredData, 
  chartType, 
  setChartType,
  processDataForCharts,
  processCategoryData,
  processMonthlyData
}) => {
  const renderCashFlowChart = () => {
    const data = processDataForCharts();
    
    if (!data.length) return <Empty description="Không có dữ liệu" />;

    return (
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={60}
            interval={'auto'}
          />
          <YAxis 
            tick={{ fontSize: 11 }}
            tickFormatter={(value) => {
              if (Math.abs(value) >= 1000000) {
                return `${(value / 1000000).toFixed(1)}M`;
              }
              if (Math.abs(value) >= 1000) {
                return `${(value / 1000).toFixed(0)}K`;
              }
              return value;
            }}
            width={80}
          />
          <Tooltip 
            formatter={(value, name) => [
              formatCurrency(value), 
              name
            ]}
            labelFormatter={(label) => `Ngày: ${label}`}
          />
          <Legend verticalAlign="top" />
          <Area 
            type="monotone" 
            dataKey="income" 
            stackId="1"
            stroke={COLORS.income} 
            fill={COLORS.income}
            fillOpacity={0.3}
            name="Thu nhập"
          />
          <Area 
            type="monotone" 
            dataKey="expense" 
            stackId="1"
            stroke={COLORS.expense} 
            fill={COLORS.expense}
            fillOpacity={0.3}
            name="Chi tiêu"
          />
          <Line 
            type="monotone" 
            dataKey="net" 
            stroke={COLORS.primary} 
            strokeWidth={3}
            dot={{ fill: COLORS.primary, strokeWidth: 2, r: 4 }}
            name="Thu nhập ròng"
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  const renderCategoryChart = () => {
    const data = processCategoryData();
    
    if (!data.length) return <Empty description="Không có dữ liệu" />;

    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => formatCurrency(value)}
            labelFormatter={(label) => `Danh mục: ${label}`}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  const renderMonthlyTrendChart = () => {
    const data = processMonthlyData();
    
    if (!data.length) return <Empty description="Không có dữ liệu" />;

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            tick={{ fontSize: 11 }}
            tickFormatter={(value) => {
              if (Math.abs(value) >= 1000000) {
                return `${(value / 1000000).toFixed(1)}M`;
              }
              if (Math.abs(value) >= 1000) {
                return `${(value / 1000).toFixed(0)}K`;
              }
              return value;
            }}
            width={80}
          />
          <Tooltip 
            formatter={(value, name) => [
              formatCurrency(value), 
              name === 'income' ? 'Thu nhập' : 'Chi tiêu'
            ]}
            labelFormatter={(label) => `Tháng: ${label}`}
          />
          <Legend verticalAlign="top" />
          <Bar dataKey="income" fill={COLORS.income} name="Thu nhập" />
          <Bar dataKey="expense" fill={COLORS.expense} name="Chi tiêu" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderTransactionTrendChart = () => {
    const data = processDataForCharts();
    
    if (!data.length) return <Empty description="Không có dữ liệu" />;

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            tick={{ fontSize: 11 }}
            tickFormatter={(value) => {
              if (Math.abs(value) >= 1000000) {
                return `${(value / 1000000).toFixed(1)}M`;
              }
              if (Math.abs(value) >= 1000) {
                return `${(value / 1000).toFixed(0)}K`;
              }
              return value;
            }}
            width={60}
          />
          <Tooltip 
            formatter={(value) => [value, 'Số giao dịch']}
            labelFormatter={(label) => `Ngày: ${label}`}
          />
          <Legend verticalAlign="top" />
          <Line 
            type="monotone" 
            dataKey="count" 
            stroke={COLORS.secondary} 
            strokeWidth={3}
            dot={{ fill: COLORS.secondary, strokeWidth: 2, r: 4 }}
            name="Số giao dịch"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <>
      <Row gutter={[16, 16]} className="statis-charts-section">
        <Col xs={24} lg={16}>
          <Card 
            title="Luồng Tiền Mặt" 
            extra={
              <div className="statis-chart-controls">
                {/* <Select
                  value={chartType}
                  onChange={setChartType}
                  style={{ width: 100 }}
                  size="small"
                >
                  <Option value="line">Đường</Option>
                  <Option value="area">Vùng</Option>
                  <Option value="bar">Cột</Option>
                </Select> */}
              </div>
            }
            className="statis-chart-card"
          >
            {renderCashFlowChart()}
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Phân Bổ Theo Danh Mục" className="statis-chart-card">
            {renderCategoryChart()}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="statis-charts-section">
        <Col xs={24} lg={12}>
          <Card title="Xu Hướng Theo Tháng" className="statis-chart-card">
            {renderMonthlyTrendChart()}
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Số Lượng Giao Dịch" className="statis-chart-card">
            {renderTransactionTrendChart()}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ChartSection; 