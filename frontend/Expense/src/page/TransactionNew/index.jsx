import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import TransactionForm from "./TransactionForm";
import TransactionTable from "./TransactionTable";
import { getTransactionByUser } from "../../services/TransactionService";
import { Button, Modal, Row, Col, Input, Select } from "antd";
import RecurringTransactionModelForm from "./TransactionForm/RecurringTransactionModelForm";
import TransactionRecurringList from "./TransactionRecurringList";
import TransactionRecurringDetail from "./TransactionRecurringDetail";
import {
  getRecurringTransactionByUser,
  deleteRecurringTransaction,
  getRecurringTransaction,
  getCategoryRecurringTransaction,
} from "../../services/RecurringTransactionService";
import { FiSearch } from "react-icons/fi";
import "./TransactionNew.scss";
import removeVietnameseTones from "../../helpers/normalize";
import HighlightText from "../../components/HighlightText";
import Swal from "sweetalert2";
import { useSearchParams, useNavigate } from "react-router-dom";
import EditRecurringTransactionForm from "./EditRecurringTransactionForm";

function TransactionNew() {
  const [transactionsAll, setTransactionsAll] = useState([]);
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('transactionMode') || "normal";
  });
  const [selectedRecurring, setSelectedRecurring] = useState(() => {
    const saved = localStorage.getItem('selectedRecurring');
    return saved ? JSON.parse(saved) : null;
  });
  const userId = getCookie("id");
  const [showRecurringForm, setShowRecurringForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [recurringList, setRecurringList] = useState([]);
  const [recurringLoading, setRecurringLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [recurringSearch, setRecurringSearch] = useState("");
  const [recurringStatus, setRecurringStatus] = useState("all");
  const [categories, setCategories] = useState([]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    localStorage.setItem('transactionMode', newMode);
  };

  const handleSelectRecurring = (item) => {
    setDetailLoading(true);
    setSelectedRecurring(item);
    localStorage.setItem('selectedRecurring', JSON.stringify(item));
    setTimeout(() => {
      setDetailLoading(false);
    }, 400);
  };

  const handleDeleteRecurring = async (item) => {
    try {
      const result = await Swal.fire({
        title: 'Bạn có chắc chắn?',
        text: "Giao dịch định kỳ này sẽ bị xóa vĩnh viễn!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--primary-color)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        customClass: {
          popup: 'animated fadeInDown'
        }
      });

      if (result.isConfirmed) {
        await deleteRecurringTransaction(item.id);
        await Swal.fire({
          title: 'Đã xóa!',
          text: 'Giao dịch định kỳ đã được xóa thành công.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'animated fadeInDown'
          }
        });
        await fetchRecurring();
        setSelectedRecurring(null);
        localStorage.removeItem('selectedRecurring');
      }
    } catch (error) {
      Swal.fire({
        title: 'Lỗi!',
        text: 'Không thể xóa giao dịch định kỳ. Vui lòng thử lại!',
        icon: 'error',
        confirmButtonText: 'Đồng ý',
        confirmButtonColor: 'var(--primary-color)',
        customClass: {
          popup: 'animated fadeInDown'
        }
      });
    }
  };

  const fetchApi = async () => {
    const [transactions, categories] = await Promise.all([
      getTransactionByUser(userId),
      getCategoryRecurringTransaction(userId)
    ]);
    setCategories(categories);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const filteredByMonth = transactions.filter((item) => {
      const itemDate = new Date(item.createdAt);
      const itemMonth = itemDate.getMonth() + 1;
      const itemYear = itemDate.getFullYear();
      return itemMonth === currentMonth && itemYear === currentYear;
    });

    const sortedByDate = filteredByMonth.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setTransactionsAll(sortedByDate);
  };

  const fetchRecurring = async () => {
    try {
      setRecurringLoading(true);
      const res = await getRecurringTransactionByUser(userId);
      setRecurringList(res);
      
      // Khôi phục selected recurring sau khi fetch data
      const savedRecurring = localStorage.getItem('selectedRecurring');
      if (savedRecurring) {
        const parsedRecurring = JSON.parse(savedRecurring);
        const foundRecurring = res.find(r => r.id === parsedRecurring.id);
        if (foundRecurring) {
          setSelectedRecurring(foundRecurring);
        } else {
          // Nếu không tìm thấy recurring đã lưu trong danh sách mới
          localStorage.removeItem('selectedRecurring');
          setSelectedRecurring(null);
        }
      }
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

  useEffect(() => {
    if (selectedRecurring) {
      fetchApi();
    }
  }, [selectedRecurring]);

  const onReload = () => {
    fetchApi();
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
              onClick={() => handleModeChange("normal")}
            >
              Giao dịch thường
            </Button>
            <Button
              type={mode === "recurring" ? "primary" : "default"}
              onClick={() => handleModeChange("recurring")}
            >
              Giao dịch định kỳ
            </Button>
          </Button.Group>
        </div>
        {mode === "normal" && (
          <>
            <TransactionForm onReload={onReload} />
            <TransactionTable transactionsAll={transactionsAll} onReload={onReload} />
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
                <div className="recurring-button-container">
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
                    style={{ margin: "0 0 12px 0" }}
                  >
                    <Select
                      value={recurringStatus}
                      onChange={setRecurringStatus}
                      style={{ width: "100%" }}
                      options={[
                        { value: "active", label: "Đang hoạt động" },
                        { value: "paused", label: "Tạm dừng" },
                        { value: "cancelled", label: "Đã hủy" },
                        { value: "all", label: "Tất cả" },
                      ]}
                    />
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
                  categories={categories}
                  onReload={onReload}
                  fetchRecurring={fetchRecurring}
                  data={selectedRecurring}
                  loading={detailLoading}
                  transactionsAll={transactionsAll}
                  onEdit={() => setShowEditForm(true)}
                  onDelete={() => handleDeleteRecurring(selectedRecurring)}
                />
              </Col>
            </Row>
            
              <RecurringTransactionModelForm
                userId={userId}
                fetchRecurring={fetchRecurring}
                showRecurringForm={showRecurringForm}
                setShowRecurringForm={setShowRecurringForm}
                recurringLoading={recurringLoading}
                setRecurringLoading={setRecurringLoading}
                categories={categories}
                onCancel={() => setShowRecurringForm(false)}
              />
              <EditRecurringTransactionForm 
                userId={userId}
                fetchRecurring={fetchRecurring}
                showEditForm={showEditForm}
                setShowEditForm={setShowEditForm}
                recurringLoading={recurringLoading}
                setRecurringLoading={setRecurringLoading}
                selectedRecurring={selectedRecurring}
                categories={categories}
                />
          </>
        )}
      </div>
    </>
  );
}
export default TransactionNew;
