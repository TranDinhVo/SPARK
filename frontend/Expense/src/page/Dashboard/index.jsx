import { Row, Col } from "antd";
import { GoChevronRight } from "react-icons/go";

import "../../assets/scss/Dashboard.scss";
import CategoryDashboard from "../../components/CategoryDashboard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navagate = useNavigate();
  return (
    <>
      <Row gutter={[16, 16]} className="dashboard">
        <Col xl={13} className="dashboard__left">
          <Row className="dashboard__item">
            <div className="dashboard__header">
              <h4 className="dashboard__title">Danh mục</h4>
              <div className="dashboard__header--view">
                <span>Xem thêm</span>
                <GoChevronRight />
              </div>
            </div>
            <div className="dashboard__content--slider">
              <CategoryDashboard />
            </div>
          </Row>
          <Row className="dashboard__item">
            <div className="dashboard__header">
              <h4 className="dashboard__title">Thống kê thu chi</h4>
              <div
                className="dashboard__header--view"
                onClick={() => {
                  navagate("/giao-dich");
                }}
              >
                <span>Xem thêm</span>
                <GoChevronRight />
              </div>
            </div>
            <div className="dashboard__content">
              <div className="dashboard__content--expense">expense</div>
              <div className="dashboard__content--income">income</div>
            </div>
          </Row>
          <Row className="dashboard__item">
            <div className="dashboard__header">
              <h4 className="dashboard__title">Dòng tiền</h4>
            </div>
            <div className="dashboard__content">
              <div className="dashboard__content--table">bang</div>
            </div>
          </Row>
        </Col>
        <Col xl={11} className="dashboard__right"></Col>
      </Row>
    </>
  );
}
export default Dashboard;
