import { Row, Col } from "antd";
import { GoChevronRight } from "react-icons/go";
import { motion } from "framer-motion";
import "../../assets/scss/Dashboard.scss";
import { useNavigate } from "react-router-dom";

import CategoryDashboard from "./CategoryDashboard";
import ExpenseDashboard from "./ExpenseDashboard";
import BudgetTransaction from "./BudgetTransaction";
import IncomeDashboard from "./IncomeDashboard";
import CashFlowDashboard from "./CashFlowDashboard";

function Dashboard() {
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(e);
  };

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 80 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 12,
        mass: 0.8,
        duration: 0.8,
      },
    },
  };

  return (
    <Row gutter={[16, 16]} className="dashboard">
      <Col xl={13} lg={10} className="dashboard__left">
        {/* Danh mục */}
        <motion.div
          variants={fadeInUpVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
        >
          <Row className="dashboard__item">
            <div className="dashboard__header">
              <h4 className="dashboard__title">Danh mục</h4>
              <div
                className="dashboard__header--view"
                onClick={() => handleClick("/")}
              >
                <span>Xem thêm</span>
                <GoChevronRight />
              </div>
            </div>
            <div className="dashboard__content--slider">
              <CategoryDashboard />
            </div>
          </Row>
        </motion.div>

        {/* Thống kê thu chi */}
        <motion.div
          variants={fadeInUpVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.1 }}
        >
          <Row className="dashboard__item">
            <div className="dashboard__header">
              <h4 className="dashboard__title">Thống kê thu chi</h4>
              <div
                className="dashboard__header--view"
                onClick={() => handleClick("/giao-dich")}
              >
                <span>Xem thêm</span>
                <GoChevronRight />
              </div>
            </div>
            <div className="dashboard__content">
              <div className="dashboard__content--expense">
                <ExpenseDashboard />
              </div>
              <div className="dashboard__content--income">
                <IncomeDashboard />
              </div>
            </div>
          </Row>
        </motion.div>

        {/* Dòng tiền */}
        <motion.div
          variants={fadeInUpVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.2 }}
        >
          <Row className="dashboard__item">
            <div className="dashboard__content">
              <CashFlowDashboard />
            </div>
          </Row>
        </motion.div>
      </Col>

      {/* Ngân sách */}
      <Col xl={10} lg={10} className="dashboard__right">
        <motion.div
          variants={fadeInUpVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.3 }}
        >
          <Row>
            <Col xl={24}>
              <BudgetTransaction />
            </Col>
          </Row>
        </motion.div>
      </Col>
    </Row>
  );
}

export default Dashboard;
