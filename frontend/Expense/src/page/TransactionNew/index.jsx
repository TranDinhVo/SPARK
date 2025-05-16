import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import TransactionForm from "./TransactionForm";
import TransactionTable from "./TransactionTable";
import { getTransactionByUser } from "../../services/TransactionService";
import { Button, Modal, Row, Col, Input } from "antd";
import RecurringTransactionModelForm from "./TransactionForm/RecurringTransactionModelForm";
import TransactionRecurringList from "./TransactionRecurringList";
import TransactionRecurringDetail from "./TransactionRecurringDetail";
import {
  getRecurringTransactionByUser,
  deleteRecurringTransaction,
  getRecurringTransaction,
} from "../../services/RecurringTransactionService";
import { FiSearch } from "react-icons/fi";
import "./TransactionNew.scss";
import removeVietnameseTones from "../../helpers/normalize";
import HighlightText from "../../components/HighlightText";

function TransactionNew() {
  const [transactions, setTransactions] = useState([]);
  const [mode, setMode] = useState("normal"); // normal | recurring
  const userId = getCookie("id");
  const [showRecurringForm, setShowRecurringForm] = useState(false);
  const [recurringList, setRecurringList] = useState([]);
  const [recurringLoading, setRecurringLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [selectedRecurring, setSelectedRecurring] = useState(null);
  const [recurringSearch, setRecurringSearch] = useState("");
  const [recurringStatus, setRecurringStatus] = useState("all"); // all | active | cancelled | paused

  const fetchApi = async () => {
    const result = await getTransactionByUser(userId);
    console.log(result);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const filteredByMonth = result.filter((item) => {
      return item.recurrence?.id === selectedRecurring?.id;
    });
    console.log(filteredByMonth);
    const sortedByDate = filteredByMonth.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setTransactions(sortedByDate);
  };

  const fetchRecurring = async () => {
    setRecurringLoading(true);
    try {
      // const res = await getRecurringTransactionByUser(userId);
      const res = await getRecurringTransaction();
      setRecurringList(res);
      if (res.length > 0) setSelectedRecurring(res[0]);
      else setSelectedRecurring(null);
    } catch (e) {
      setRecurringList([]);
      setSelectedRecurring(null);
    } finally {
      setRecurringLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    if (mode === "recurring") {
      setRecurringLoading(true);
      const timeout = setTimeout(() => {
        setRecurringLoading(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [recurringSearch]);

  useEffect(() => {
    if (mode === "recurring") fetchRecurring();
  }, [mode]);

  const onReload = () => {
    fetchApi();
  };

  const handleDeleteRecurring = async (item) => {
    setRecurringLoading(true);
    await deleteRecurringTransaction(item.id);
    await fetchRecurring();
  };

  const handleSelectRecurring = (item) => {
    setDetailLoading(true);
    setSelectedRecurring(item);
    setTimeout(() => {
      setDetailLoading(false);
    }, 400); // 400ms, khớp với hiệu ứng fadeIn
  };

  const filteredRecurring = recurringList.filter((item) => {
    const search = removeVietnameseTones(recurringSearch.toLowerCase());
    const name = removeVietnameseTones(item.name.toLowerCase());
    const matchSearch = name.includes(search);
    let matchStatus = true;
    if (recurringStatus === "active") matchStatus = item.status?.code === 1;
    if (recurringStatus === "cancelled") matchStatus = item.status?.code === 2;
    if (recurringStatus === "paused") matchStatus = item.status?.code === 3;
    return matchSearch && matchStatus;
  });

  return (
    <>
      <div className="transaction">
        <div className="transaction-toggle-mode">
          <Button.Group>
            <Button
              type={mode === "normal" ? "primary" : "default"}
              onClick={() => setMode("normal")}
            >
              Giao dịch thường
            </Button>
            <Button
              type={mode === "recurring" ? "primary" : "default"}
              onClick={() => setMode("recurring")}
            >
              Giao dịch định kỳ
            </Button>
          </Button.Group>
        </div>
        {mode === "normal" && (
          <>
            <TransactionForm onReload={onReload} />
            <TransactionTable transactions={transactions} onReload={onReload} />
          </>
        )}
        {mode === "recurring" && (
          <>
            <Row gutter={[20, 20]} className="recurring__row">
              <Col span={8} className="recurring__list">
                <div className="recurring__search">
                  <FiSearch className="recurring__search-icon" />
                  <Input
                    placeholder="Tìm kiếm giao dịch định kỳ"
                    value={recurringSearch}
                    onChange={(e) => setRecurringSearch(e.target.value)}
                    bordered={false}
                    className="recurring__search-input"
                  />
                </div>
                <div style={{ margin: "16px 0" }}>
                  <Button
                    type="primary"
                    block
                    onClick={() => setShowRecurringForm(true)}
                  >
                    Thêm giao dịch định kỳ
                  </Button>
                </div>
                <div className="recurring__wrapper">
                  <div
                    className="recurring__status-filter"
                    style={{ display: "flex", gap: 8, margin: "0 0 12px 0" }}
                  >
                    <Button
                      type={
                        recurringStatus === "active" ? "primary" : "default"
                      }
                      onClick={() => setRecurringStatus("active")}
                      style={{ fontWeight: 600 }}
                    >
                      Đang hoạt động
                    </Button>
                    <Button
                      type={
                        recurringStatus === "paused" ? "primary" : "default"
                      }
                      onClick={() => setRecurringStatus("paused")}
                      style={{ fontWeight: 600 }}
                    >
                      Tạm dừng
                    </Button>
                    <Button
                      type={
                        recurringStatus === "cancelled" ? "primary" : "default"
                      }
                      onClick={() => setRecurringStatus("cancelled")}
                      style={{ fontWeight: 600 }}
                    >
                      Đã hủy
                    </Button>
                    <Button
                      type={recurringStatus === "all" ? "primary" : "default"}
                      onClick={() => setRecurringStatus("all")}
                      style={{ fontWeight: 600 }}
                    >
                      Tất cả
                    </Button>
                  </div>
                  <TransactionRecurringList
                    list={filteredRecurring}
                    loading={recurringLoading}
                    selectedId={selectedRecurring?.id}
                    onSelect={handleSelectRecurring}
                    onDelete={handleDeleteRecurring}
                    search={recurringSearch}
                  />
                </div>
              </Col>
              <Col span={16} className="recurring__detail">
                <TransactionRecurringDetail
                  data={selectedRecurring}
                  loading={detailLoading}
                  transactions={transactions}
                  onEdit={() => setShowRecurringForm(true)}
                  onDelete={() => handleDeleteRecurring(selectedRecurring)}
                />
              </Col>
            </Row>
            <Modal
              open={showRecurringForm}
              onCancel={() => setShowRecurringForm(false)}
              footer={null}
              title={
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: 20,
                    color: "var(--primary-color)",
                  }}
                >
                  Thêm giao dịch định kỳ
                </span>
              }
              width={450}
              centered
              destroyOnClose
            >
              <RecurringTransactionModelForm
                userId={userId}
                onSubmit={(data) => {
                  fetchRecurring();
                  setShowRecurringForm(false);
                }}
                onCancel={() => setShowRecurringForm(false)}
              />
            </Modal>
          </>
        )}
      </div>
    </>
  );
}
export default TransactionNew;
