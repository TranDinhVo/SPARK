import { useEffect, useState } from "react";
import { getBudgetByUser } from "../../../services/BudgetService";
import { getCookie } from "../../../helpers/cookie";
import { GoChevronRight } from "react-icons/go";
import "./BudgetDashboard.scss";;
import { useNavigate } from "react-router-dom";
import 'animate.css/animate.min.css';
import useInViewAnimation from "../../../hooks/useInViewAnimation";
import BudgetItem from "./BudgetItem";


function BudgetDashboard() {
  const navigate = useNavigate();
  const [dataBudget, setDataBudget] = useState([]);
  const userId = getCookie("id");
  const [headerRef, headerClass] = useInViewAnimation("animate__fadeInDown");


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
          (start.getMonth() === currentMonth && start.getFullYear() === currentYear) ||
          (end.getMonth() === currentMonth && end.getFullYear() === currentYear)
        );
      });

      const sorted = filtered.sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
      );
      setDataBudget(sorted);
    };
    fetchApi();
  }, [userId]);

  return (
    <>
      <div className="budget-dashboard">
      <div
  ref={headerRef}
  className={`budget-dashboard__header ${headerClass}`}
  style={{
    animationDuration: "0.8s",
    animationDelay: "100ms",
  }}
>
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
          <div className="budget-dashboard__list">
           {dataBudget.map((item, index) => {
  return <BudgetItem key={index} item={item} index={index} />;
})}
          </div>
        ) : (
          <>trong</>
        )}
      </div>
    </>
  );
}

export default BudgetDashboard;
