import { Row, Col, Input, Spin, Progress, Modal } from "antd";
import { useEffect, useState, useCallback, useMemo } from "react";
import { deleteBudget, getBudgetByUser } from "../../services/BudgetService";
import { getTransactionByUser } from "../../services/TransactionService";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getCookie } from "../../helpers/cookie";
import "./Budget.scss";
import { formatDateTime } from "../../helpers/formatDateTime";
import { formatDate } from "../../helpers/formatDate";
import { GoChevronRight } from "react-icons/go";
import { AiOutlinePlus, AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import Swal from "sweetalert2";

import { formatCurrency } from "../../helpers/formatCurrency";
import BudgetFormModal from "./BudgetFormModal";
import HighlightText from "../../components/HighlightText";
import { removeVietnameseTones } from "../../helpers/normalize";

function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loadingTransaction, setLoadingTransaction] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState("hoatdong");
  const [currentPage, setCurrentPage] = useState(1);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editBudget, setEditBudget] = useState(null);

  const pageSize = 4;
  const userId = getCookie("id");

  // Timer cho current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch budgets - chỉ chạy 1 lần khi userId thay đổi
  const fetchApi = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const result = await getBudgetByUser(userId);

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      const filteredByMonth = result.filter((item) => {
        const date = new Date(item.startDate);
        return (
          date.getMonth() + 1 === currentMonth &&
          date.getFullYear() === currentYear
        );
      });

      setBudgets(filteredByMonth);
    } catch (error) {
      console.error("Fetch Budget error:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  // Memoize filtered budgets để tránh re-calculate không cần thiết
  const filteredBudgets = useMemo(() => {
    let filtered = budgets;

    // Filter by active tab
    if (activeTab === "canhbao") {
      filtered = budgets.filter((item) => {
        const threshold = item.amountLimit * (item.alertThreshold || 0.8);
        return item.usedAmount >= threshold;
      });
    }

    // Filter by search text
    if (searchText.trim()) {
      const text = removeVietnameseTones(searchText.trim().toLowerCase());
      filtered = filtered.filter((item) =>
        removeVietnameseTones(item.budgetName || "")
          .toLowerCase()
          .includes(text)
      );
    }

    return filtered;
  }, [budgets, activeTab, searchText]);

  // Auto select first budget khi filteredBudgets thay đổi
  useEffect(() => {
    if (filteredBudgets.length > 0) {
      // Chỉ set selectedBudget nếu chưa có hoặc budget hiện tại không còn trong danh sách filtered
      const currentBudgetExists = filteredBudgets.some(
        (budget) =>
          selectedBudget && budget.budgetName === selectedBudget.budgetName
      );

      if (!selectedBudget || !currentBudgetExists) {
        setSelectedBudget(filteredBudgets[0]);
      }
    } else {
      setSelectedBudget(null);
    }
  }, [filteredBudgets, selectedBudget]);

  // Fetch transactions cho selected budget
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!selectedBudget || !userId) {
        setTransactions([]);
        return;
      }

      setLoadingTransaction(true);
      try {
        const allTransactions = await getTransactionByUser(userId);

        const start = new Date(selectedBudget.startDate);
        const end = new Date(selectedBudget.endDate);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);

        const filtered = allTransactions.filter((tran) => {
          if (tran.type !== "Chi") return false;
          const tranDate = new Date(tran.createdAt);
          return (
            tranDate >= start &&
            tranDate <= end &&
            tran.name === selectedBudget.budgetName
          );
        });

        setTransactions(filtered);
      } catch (error) {
        console.error("Fetch transactions error:", error);
        setTransactions([]);
      } finally {
        setLoadingTransaction(false);
      }
    };

    fetchTransactions();
  }, [selectedBudget, userId]);

  // Handle delete budget
  const handleDeleteBudget = async (budget) => {
    const confirm = await Swal.fire({
      title: "Xác nhận xóa?",
      text: `Bạn có chắc muốn xóa ngân sách "${budget.budgetName}" không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--primary-color)",
      cancelButtonColor: "#d1d5db",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (confirm.isConfirmed) {
      try {
        const result = await deleteBudget(budget.id);
        if (result) {
          await Swal.fire(
            "Đã xóa!",
            "Ngân sách đã được xóa thành công.",
            "success"
          );
          fetchApi();
        } else {
          Swal.fire("Thất bại", "Xóa ngân sách thất bại!", "error");
        }
      } catch (error) {
        Swal.fire("Lỗi", "Có lỗi xảy ra!", "error");
      }
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredBudgets.length / pageSize);
  const paginatedBudgets = useMemo(() => {
    return filteredBudgets.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  }, [filteredBudgets, currentPage, pageSize]);

  const renderPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 3);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <div
          key={page}
          className={`budget__page-number ${
            currentPage === page ? "active" : ""
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </div>
      );
    }
    return pages;
  };

  const onReload = useCallback(() => {
    fetchApi();
  }, [fetchApi]);

  // Event handlers
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleModalSave = (formData) => {
    console.log("Dữ liệu form:", formData);
    setOpenModal(false);
  };

  const handleEditBudget = (budget) => {
    setEditBudget({
      ...budget,
      categoryId: budget.categoryId || budget.category?.id,
    });
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => setEditModalOpen(false);

  const handleEditModalSave = () => {
    setEditModalOpen(false);
    onReload();
  };

  return (
    <>
      <Row gutter={[20, 20]} className="budget__row">
        <Col span={8}>
          <div className="search__budget">
            <FiSearch className="search__icon" />
            <Input
              placeholder="Tìm kiếm ở đây"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              bordered={false}
              className="search__input"
            />
          </div>
        </Col>
        <Col span={12}></Col>
        <Col span={4}>
          <div className="budget__add--button" onClick={handleOpenModal}>
            <AiOutlinePlus className="budget__add--icon" />
            <span>Thêm</span>
          </div>
        </Col>
      </Row>

      <Row gutter={[]} className="budget__row">
        <Col span={8} className="budget__list">
          <div className="budget__wrapper">
            {loading && (
              <div className="budget__loading">
                <Spin tip="Đang tải dữ liệu..." size="large" />
              </div>
            )}

            <div className="budget__tab">
              <div
                className={`budget__tab--item ${
                  activeTab === "hoatdong" ? "active" : ""
                }`}
                onClick={() => setActiveTab("hoatdong")}
                data-tab="hoatdong"
              >
                Hoạt động
              </div>
              <div
                className={`budget__tab--item ${
                  activeTab === "canhbao" ? "active" : ""
                }`}
                onClick={() => setActiveTab("canhbao")}
                data-tab="canhbao"
              >
                Cảnh báo
              </div>
            </div>

            {!loading &&
              (filteredBudgets.length > 0 ? (
                <>
                  {paginatedBudgets.map((budget, index) => (
                    <div
                      key={`${budget.id}-${budget.budgetName}`}
                      className={`budget__item ${
                        selectedBudget &&
                        selectedBudget.budgetName === budget.budgetName
                          ? "budget__active"
                          : ""
                      }`}
                      onClick={() => setSelectedBudget(budget)}
                    >
                      <div className="budget__content">
                        <div className="budget__top">
                          <h4 className="budget__top--title">
                            <HighlightText
                              text={budget.budgetName}
                              keyword={searchText}
                            />
                          </h4>
                          <div
                            className="budget__top--delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteBudget(budget);
                            }}
                          >
                            <AiOutlineClose />
                          </div>
                        </div>
                        <div className="budget__center">
                          <div
                            className="budget__center--image"
                            dangerouslySetInnerHTML={{
                              __html: budget.iconUrl,
                            }}
                          />
                          <div className="budget__amount">
                            <p className="budget__amount--used">
                              {formatCurrency(budget.usedAmount)}
                            </p>
                            <p className="budget__amount--limit">
                              {formatCurrency(budget.amountLimit)}
                            </p>
                          </div>
                          <p className="budget__center--btn">
                            <GoChevronRight />
                          </p>
                        </div>
                      </div>
                      <div className="budget__bottom">
                        <p className="budget__bottom--time">
                          {formatDate(budget.endDate)}
                        </p>
                        <div className="budget__bottom--progress">
                          <Progress
                            percent={
                              budget.amountLimit
                                ? Math.min(
                                    (budget.usedAmount / budget.amountLimit) *
                                      100,
                                    100
                                  )
                                : 0
                            }
                            status={
                              budget.amountLimit &&
                              budget.usedAmount / budget.amountLimit > 1
                                ? "exception"
                                : "normal"
                            }
                            strokeColor={{
                              "0%": "var(--primary-color)",
                            }}
                            trailColor="#ffffff"
                            strokeWidth={14}
                            showInfo={false}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {totalPages > 1 && (
                    <div className="budget__pagination">
                      <div
                        className="budget__arrow"
                        onClick={() =>
                          currentPage > 1 && setCurrentPage(currentPage - 1)
                        }
                      >
                        <FiChevronLeft />
                      </div>
                      {renderPageNumbers()}
                      <div
                        className="budget__arrow"
                        onClick={() =>
                          currentPage < totalPages &&
                          setCurrentPage(currentPage + 1)
                        }
                      >
                        <FiChevronRight />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p>Không tìm thấy kết quả phù hợp.</p>
              ))}
          </div>
        </Col>

        <Col span={15} className="budget__detail">
          <h2 className="budget__detail-title">Chi tiết ngân sách</h2>
          {loading && (
            <div className="budget__loading">
              <Spin tip="Đang tải dữ liệu..." size="large" />
            </div>
          )}

          {selectedBudget ? (
            <div className="budget__detail--list">
              <div className="budget__detail--header">
                <div className="budget__detail--left">
                  <h3 className="budget__detail--title">
                    {selectedBudget.budgetName}
                  </h3>
                  <p className="budget__detail--time">
                    {formatDateTime(currentTime)}
                  </p>
                </div>
                <div
                  className="budget__detail--image"
                  dangerouslySetInnerHTML={{ __html: selectedBudget.iconUrl }}
                />
                <button
                  className="budget__detail--edit-btn"
                  onClick={() => handleEditBudget(selectedBudget)}
                  style={{
                    marginLeft: 16,
                    background: "var(--primary-color, #ff8800)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 16px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <AiOutlineEdit style={{ fontSize: 18 }} /> Chỉnh sửa
                </button>
              </div>

              <div className="budget__detail--box">
                <p className="budget__detail--info">
                  <b>Mục tiêu số tiền</b>
                  <span>{formatCurrency(selectedBudget.amountLimit)} </span>
                </p>
                <p className="budget__detail--info">
                  <b>Ngày bắt đầu</b>
                  <span> {formatDate(selectedBudget.startDate)}</span>
                </p>
                <p className="budget__detail--info">
                  <b>Ngày kết thúc</b>
                  <span>{formatDate(selectedBudget.endDate)}</span>
                </p>
              </div>

              <div className="budget__detail--box">
                <p className="budget__detail--info">
                  <b>Số tiền đã chi</b>
                  <span>{formatCurrency(selectedBudget.usedAmount)}</span>
                </p>
                <p className="budget__detail--info">
                  <b>Số giao dịch</b>
                  <span>{transactions.length}</span>
                </p>
                <p className="budget__detail--info">
                  <b>Tỷ lệ sử dụng</b>
                  <span>
                    {selectedBudget.amountLimit
                      ? Math.round(
                          (selectedBudget.usedAmount /
                            selectedBudget.amountLimit) *
                            100
                        )
                      : 0}
                    %
                  </span>
                </p>
              </div>

              <div className="budget__detail--transaction">
                <h3>Danh sách giao dịch</h3>
                {loadingTransaction ? (
                  <Spin tip="Đang tải giao dịch..." />
                ) : transactions.length > 0 ? (
                  <div className="transaction__list">
                    {transactions.map((tran, index) => (
                      <div
                        key={`${tran.id}-${index}`}
                        className="transaction__item"
                      >
                        <div className="transaction__left">
                          <div
                            className="transaction__icon"
                            dangerouslySetInnerHTML={{
                              __html: selectedBudget.iconUrl,
                            }}
                          />
                          <div className="transaction__info">
                            <p className="transaction__name">{tran.name}</p>
                            <p className="transaction__date">
                              {formatDate(tran.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="transaction__right">
                          <div className="transaction__amount">
                            - {formatCurrency(tran.amount)}
                          </div>
                          <div className="transaction__note">
                            {tran.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Không có giao dịch nào.</p>
                )}
              </div>
            </div>
          ) : (
            <p>Chọn ngân sách để xem chi tiết</p>
          )}
        </Col>
      </Row>

      {/* Modals */}
      <BudgetFormModal
        open={openModal}
        onCancel={handleCloseModal}
        onSave={handleModalSave}
        onReload={onReload}
        budgets={budgets}
      />

      <BudgetFormModal
        open={editModalOpen}
        onCancel={handleEditModalClose}
        onSave={handleEditModalSave}
        onReload={onReload}
        budgets={budgets}
        editBudget={editBudget}
      />
    </>
  );
}

export default Budget;
