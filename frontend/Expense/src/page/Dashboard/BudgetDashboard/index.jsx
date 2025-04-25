import { useEffect, useState } from "react";
import { getBudgetByUser } from "../../../services/BudgetService";
import { getCookie } from "../../../helpers/cookie";
import { GoChevronRight } from "react-icons/go";
import "./BudgetDashboard.scss";
import { Progress } from "antd";
import { useNavigate } from "react-router-dom";

function BudgetDashboard() {
  const navigate = useNavigate();
  const [dataBudget, setDataBudget] = useState([]);
  const userId = getCookie("id");

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getBudgetByUser(userId);

      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const filtered = result.filter((item) => {
        const start = new Date(item.startDate);
        const end = new Date(item.endDate);
        return (
          (start.getMonth() === currentMonth &&
            start.getFullYear() === currentYear) ||
          (end.getMonth() === currentMonth && end.getFullYear() === currentYear)
        );
      });
      const sorted = filtered.sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
      );
      setDataBudget(sorted);
    };
    fetchApi();
  }, []);
  console.log(dataBudget);
  const totalBudget = 1200000; // Tổng ngân sách
  const currentSpending = 410000; // Chi tiêu hiện tại
  const percent = Math.round((currentSpending / totalBudget) * 100);
  return (
    <>
      <div className="budget-dashboard">
        <div className="budget-dashboard__header">
          <h4 className="budget-dashboard__header--title">Ngân sách</h4>
          <div
            className="budget-dashboard__header--navigate"
            onClick={() => navigate("/ngan-sach")}
          >
            <span>Xem thêm</span>
            <GoChevronRight />
          </div>
        </div>
        {dataBudget.length > 0 ? (
          <>
            <div className="budget-dashboard__list">
              {(dataBudget || []).map((item, index) => (
                <>
                  <div className="budget-dashboard__content" key={index}>
                    <div className="budget-dashboard__content--name">
                      {item.budgetName}
                    </div>
                    <div className="budget-dashboard__content--row">
                      <div className="budget-dashboard__content--image">
                        <img />
                      </div>

                      <div className="budget-dashboard__content--progress">
                        <div className="budget-dashboard__content--top">
                          <span>
                            {(() => {
                              const date = new Date(item.startDate);
                              const day = String(date.getDate()).padStart(
                                2,
                                "0"
                              );
                              const month = String(
                                date.getMonth() + 1
                              ).padStart(2, "0");
                              const year = date.getFullYear();
                              return `${day}/${month}/${year}`;
                            })()}
                          </span>
                          {/* <span>Hôm nay</span> */}
                          <span>
                            {(() => {
                              const date = new Date(item.endDate);
                              const day = String(date.getDate()).padStart(
                                2,
                                "0"
                              );
                              const month = String(
                                date.getMonth() + 1
                              ).padStart(2, "0");
                              const year = date.getFullYear();
                              return `${day}/${month}/${year}`;
                            })()}
                          </span>
                        </div>
                        <div className="budget-dashboard__content--center">
                          <Progress
                            percent={(
                              (100 * parseFloat(item.usedAmount)) /
                              parseFloat(item.amountLimit)
                            ).toFixed(0)}
                            strokeColor="var(--primary-color)"
                            trailColor="#ffffff"
                            strokeWidth={14}
                            showInfo={false}
                          />
                        </div>

                        <div className="budget-dashboard__content--bottom">
                          <span>0đ</span>
                          {/* <span>{currentSpending.toLocaleString("vi-VN")}đ</span> */}
                          <span>
                            {item.amountLimit.toLocaleString("vi-VN")}đ
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </>
        ) : (
          <>trong</>
        )}
      </div>
    </>
  );
}
export default BudgetDashboard;
