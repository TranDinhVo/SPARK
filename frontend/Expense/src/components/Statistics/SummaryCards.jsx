import React from "react";
import { Row, Col, Card, Statistic } from "antd";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart,
  PiggyBank,
  Activity,
  BarChart3
} from "lucide-react";
import "./SummaryCards.scss";

const COLORS = {
  income: "#52c41a",
  expense: "#ff4d4f",
  primary: "#1890ff",
  secondary: "#722ed1",
  success: "#52c41a",
  warning: "#faad14",
  error: "#ff4d4f",
};

const SummaryCards = ({ summary }) => {
  return (
    <Row gutter={[16, 16]} className="statis-summary-cards">
      <Col xs={24} sm={12} lg={6}>
        <Card className="statis-summary-card statis-income">
          <Statistic
            title="Tổng Thu Nhập"
            value={summary.totalIncome}
            precision={0}
            valueStyle={{ color: COLORS.income }}
            prefix={<DollarSign size={20} />}
            suffix="VND"
          />
          <div className="statis-card-icon">
            <TrendingUp size={24} color={COLORS.income} />
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card className="statis-summary-card statis-expense">
          <Statistic
            title="Tổng Chi Tiêu"
            value={summary.totalExpense}
            precision={0}
            valueStyle={{ color: COLORS.expense }}
            prefix={<ShoppingCart size={20} />}
            suffix="VND"
          />
          <div className="statis-card-icon">
            <TrendingDown size={24} color={COLORS.expense} />
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card className="statis-summary-card statis-net">
          <Statistic
            title="Thu Nhập Ròng"
            value={summary.netAmount}
            precision={0}
            valueStyle={{ color: summary.netAmount >= 0 ? COLORS.success : COLORS.error }}
            prefix={<PiggyBank size={20} />}
            suffix="VND"
          />
          <div className="statis-card-icon">
            {summary.netAmount >= 0 ? (
              <TrendingUp size={24} color={COLORS.success} />
            ) : (
              <TrendingDown size={24} color={COLORS.error} />
            )}
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card className="statis-summary-card statis-transactions">
          <Statistic
            title="Tổng Giao Dịch"
            value={summary.transactionCount}
            precision={0}
            valueStyle={{ color: COLORS.primary }}
            prefix={<Activity size={20} />}
          />
          <div className="statis-card-icon">
            <BarChart3 size={24} color={COLORS.primary} />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default SummaryCards; 