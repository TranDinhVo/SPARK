import { Row, Col, Input, Spin, Progress, Modal } from "antd";
import { useEffect, useState } from "react";
import { deleteBudget, getBudgetByUser } from "../../services/BudgetService";
import { getTransactionByUser } from "../../services/TransactionService";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getCookie } from "../../helpers/cookie";
import "./Budget.scss";
import { formatDateTime } from "../../helpers/formatDateTime";
import { formatDate } from "../../helpers/formatDate";
import { GoChevronRight } from "react-icons/go";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";

import { formatCurrency } from "../../helpers/formatCurrency";
import BudgetFormModal from "./BudgetFormModal";

function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [filteredBudgets, setFilteredBudgets] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loadingTransaction, setLoadingTransaction] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);

  const [activeTab, setActiveTab] = useState("hoatdong");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const userId = getCookie("id");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);
  const fetchApi = async () => {
    setLoading(true);
    try {
      const result = await getBudgetByUser(userId);

      // Lấy tháng hiện tại
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      // Lọc ngân sách theo tháng hiện tại
      const filteredByMonth = result.filter((item) => {
        const date = new Date(item.startDate);
        return (
          date.getMonth() + 1 === currentMonth &&
          date.getFullYear() === currentYear
        );
      });
      setBudgets(filteredByMonth);
      setFilteredBudgets(filteredByMonth);
    } catch (error) {
      console.error("Fetch Budget error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApi();
  }, [userId]);

  useEffect(() => {
    if (activeTab === "hoatdong") {
      setFilteredBudgets(budgets);
    } else {
      const filer = budgets.filter(
        (item) => item.amountLimit * item.alertThreshold < item.usedAmount
      );
      setFilteredBudgets(filer);
    }
  }, [activeTab]);
  useEffect(() => {
    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      const text = searchText.trim().toLowerCase();
      const filtered = !text
        ? budgets
        : budgets.filter((item) =>
            (item.budgetName || "").toLowerCase().includes(text)
          );
      setFilteredBudgets(filtered);
      setLoading(false);
    }, 800);

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [searchText, budgets]);

  useEffect(() => {
    if (filteredBudgets.length > 0) {
      setSelectedBudget(filteredBudgets[0]);
    } else {
      setSelectedBudget(null);
    }
  }, [filteredBudgets]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!selectedBudget) return;

      setLoadingTransaction(true);
      const allTransactions = await getTransactionByUser(userId);
      setTimeout(() => {
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

        setLoadingTransaction(false);
      }, 800);
    };

    fetchTransactions();
  }, [selectedBudget, userId]);

  const handleDeleteBudget = async (budget) => {
    const confirm = await Swal.fire({
      title: "Xác nhận xóa?",
      text: `Bạn có chắc muốn xóa ngân sách "${budget.budgetName}" không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#d1d5db",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (confirm.isConfirmed) {
      try {
        const result = await deleteBudget(budget.id);
        if (result) {
          Swal.fire("Đã xóa!", "Ngân sách đã được xóa thành công.", "success");
          fetchApi();
        } else {
          Swal.fire("Thất bại", "Xóa ngân sách thất bại!", "error");
        }
      } catch (error) {
        Swal.fire("Lỗi", "Có lỗi xảy ra!", "error");
      }
    }
  };
  const totalPages = Math.ceil(filteredBudgets.length / pageSize);
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
  const onReload = () => {
    fetchApi();
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
          <div
            className="budget__add--button"
            onClick={() => setOpenModal(true)}
          >
            <AiOutlinePlus className="budget__add--icon" />
            <span>Thêm ngân sách</span>
          </div>
          <BudgetFormModal
            open={openModal}
            onCancel={() => setOpenModal(false)}
            onSave={(formData) => {
              console.log("Dữ liệu form:", formData);
              setOpenModal(false);
            }}
            onReload={onReload}
            budgets={budgets}
          />
        </Col>
      </Row>

      {/* Danh sách ngân sách */}
      <Row gutter={[20, 20]} className="budget__row">
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
              >
                Hoạt động
              </div>
              <div
                className={`budget__tab--item ${
                  activeTab === "canhbao" ? "active" : ""
                }`}
                onClick={() => setActiveTab("canhbao")}
              >
                Cảnh báo
              </div>
            </div>
            {!loading &&
              (filteredBudgets.length > 0 ? (
                <>
                  {filteredBudgets
                    .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                    .map((budget, index) => (
                      <div
                        key={index}
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
                              {budget.budgetName}
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
                            >
                              {/* <img /> */}
                            </div>
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
                                // "100%": "#3b82f6",
                              }}
                              trailColor="#ffffff"
                              strokeWidth={14}
                              showInfo={false}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
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
                </>
              ) : (
                <>
                  <p>Không tìm thấy kết quả phù hợp.</p>
                </>
              ))}
          </div>
        </Col>

        {/* Cột chi tiết */}
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
                  dangerouslySetInnerHTML={{
                    __html: selectedBudget.iconUrl,
                  }}
                ></div>
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

              {/* <Progress
                percent={
                  selectedBudget.amountLimit
                    ? Math.min(
                        (selectedBudget.usedAmount /
                          selectedBudget.amountLimit) *
                          100,
                        100
                      )
                    : 0
                }
                status={
                  selectedBudget.amountLimit &&
                  selectedBudget.usedAmount / selectedBudget.amountLimit > 1
                    ? "exception"
                    : "normal"
                }
                strokeColor={{
                  "0%": "#34d399",
                  "100%": "#3b82f6",
                }}
                showInfo
              /> */}

              <div className="budget__detail--transaction">
                <h3>Danh sách giao dịch</h3>
                {loadingTransaction ? (
                  <Spin tip="Đang tải giao dịch..." />
                ) : transactions.length > 0 ? (
                  <div className="transaction__list">
                    {transactions.map((tran, index) => (
                      <div key={index} className="transaction__item">
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
    </>
  );
}

export default Budget;
