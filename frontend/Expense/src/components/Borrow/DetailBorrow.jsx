import { Button, Card, Col, Row, Divider, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDateTime } from "../../helpers/formatDateTime";
import { formatDate } from "../../helpers/formatDate";
import { getTransactionByUser } from "../../services/TransactionService";
import { getCookie } from "../../helpers/cookie";
import { getBorrowById } from "../../services/BorrowService";
import CustomPieChart from "../Goal/CustomPieChart";
import "../../assets/scss/detailBorrow.scss";

const DetailBorrow = () => {
  const navigate = useNavigate();
  const [borrowData, setBorrowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const userId = getCookie("id");

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const res = await getBorrowById(id);
      const transRes = await getTransactionByUser(userId);
      const transByBorrow = transRes
        .filter(
          (item) => item.borrowId != null && String(item.borrowId) === String(id)
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTransactions(transByBorrow || []);
      setBorrowData(res);
    } catch (error) {
      console.error("Error fetching borrow details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const calculatePercent = () => {
    if (!borrowData) return 0;
    return (borrowData.paidAmount / borrowData.amountLoan) * 100;
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);


  return (
    <div className="detail-borrow">
      <Card className="detail-borrow-card">
        <Button onClick={handleBack} style={{ marginBottom: 8 }}>
          ← Quay lại
        </Button>
        <Row gutter={32}>
          <Col md={10} xs={24} className="detail-borrow__left">
            <h3 className="detail-borrow__title">{borrowData.counterpartyName}</h3>
            

            <div className="detail-borrow__stats">
              <div className="stat">
                <span className="label">{borrowData.loanType === "DI_VAY" ? "Đã trả" : "Đã thu"}</span>
                <span className="value orange">
                  {borrowData.paidAmount?.toLocaleString("vi-VN")} VND
                </span>
              </div>
              <div className="stat">
                <span className="label">Tổng số tiền</span>
                <span className="value">
                  {borrowData.amountLoan?.toLocaleString("vi-VN")} VND
                </span>
              </div>
              <div className="stat">
                <span className="label">Lãi suất</span>
                <span className="value">{borrowData.interestRate}%</span>
              </div>
              <div className="stat">
                <span className="label">Thời hạn</span>
                <span className="value">{borrowData.times} tháng</span>
              </div>
              <div className="stat">
                <span className="label">Ngày đáo hạn</span>
                <span className="value">              {formatDate(new Date(borrowData.nextDueDate))}</span>
              </div>
              <div className="stat">
                <span className="label">Tiền trả tháng tới</span>
                <span className="value">
                  {(borrowData.monthMoney)?.toLocaleString("vi-VN")} VND
                </span>
              </div>
              <div className="stat">
                <span className="label">Số tháng đã trả</span>
                <span className="value">{borrowData.remainTimes}</span>
              </div>
              <div className="stat">
                <span className="label">Tỉ lệ hoàn thành</span>
                <span className="value">{calculatePercent().toFixed(2)}%</span>
              </div>
            </div>

            <Divider />
            <CustomPieChart percent={calculatePercent()} />
          </Col>

          <Col md={14} xs={24} className="detail-borrow__right">
            <div className="detail-borrow__right--list">
              <h4>Danh sách giao dịch</h4>
            </div>

            <ul className="transaction-list">
              {transactions.length > 0 ? (
                transactions.map((t, i) => (
                  <li key={i} className="transaction-item">
                    <div className="icon">
                      {/* TODO: Add transaction icon */}
                    </div>
                    <div className="info">
                      <div className="name">{t.name}</div>
                      <div className="time">{formatDate(t.createdAt)}</div>
                    </div>
                    <div className="amount-note">
                      <div className="amount">
                        {t.amount >= 0 ? "+" : "-"}
                        {Math.abs(t.amount).toLocaleString("vi-VN")}đ
                      </div>
                      <div className="note">{t.description}</div>
                    </div>
                  </li>
                ))
              ) : (
                <p>Chưa có giao dịch nào cho khoản vay này</p>
              )}
            </ul>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default DetailBorrow;
  