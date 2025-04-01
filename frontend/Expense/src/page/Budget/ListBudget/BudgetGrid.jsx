import { Row, Col, Card } from "antd";
import { formatMoney } from "../../../helpers/formatMoney";
import DetailBudget from "../ActionBudget/DetialBudget";
import "./BudgetGrid.scss";
function BudgetGrid(props) {
  const { budgets } = props;
  console.log(budgets);

  return (
    <>
      <Row gutter={[30, 30]}>
        {budgets.map((item, index) => (
          <Col span={8} key={item.id}>
            <div className={`budget-grid budget--${index % 3}`}>
              <div className="budget-grid__header">
                <h3 className="budget-grid__title">{item.category}</h3>
                <div>
                  <DetailBudget />
                </div>
              </div>
              <div className="budget-grid__content">
                <p className="budget--desc">Ngân sách còn lại</p>
                <p>
                  <span className="budget--target">
                    {formatMoney(item.amountCurrent)} VND
                  </span>
                  {/* <span> / </span> */}
                  <span className="budget--cur">
                    / {formatMoney(item.amountLimit)} VND
                  </span>
                </p>
              </div>
              <div className="budget--createAt">
                <span>Ngày tạo</span> <span> - </span>
                <span>
                  {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default BudgetGrid;
