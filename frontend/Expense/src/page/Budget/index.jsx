import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { UnorderedListOutlined, TableOutlined } from "@ant-design/icons";
import { getBudget } from "../../services/BudgetService";
import BudgetGrid from "./ListBudget/BudgetGrid";
import BudgetTable from "./ListBudget/BudgetTable";
import "./Budget.scss";
import BudgetComparison from "./BudgetComparison";
import AddBudget from "./ActionBudget/AddBudget";

function Budget() {
  const [budgets, setBudget] = useState([]);
  const [isGrid, setIsGrid] = useState(false);
  const fetchApi = async () => {
    const result = await getBudget();
    setBudget(result);
  };
  useEffect(() => {
    fetchApi();
  }, []);

  const handleReload = () => {
    fetchApi();
  };
  return (
    <>
      <Row>
        <Col xl={23}>
          <Row gutter={[20, 20]}>
            <Col xl={12}>
              <BudgetComparison budgets={budgets} />
            </Col>
            <Col xl={12}>Doi chiu</Col>
          </Row>
          <Row gutter={[20, 20]}>
            <Col xl={24}>
              <h4 className="title-budget">DANH SÁCH NGÂN SÁCH</h4>
            </Col>
          </Row>
          <Row gutter={[20, 20]}>
            <Col xl={1}>sort</Col>
            <Col xl={2}>filtẻ</Col>
            <Col xl={3}>clearAll</Col>
            <Col xl={10}></Col>
            <Col xl={3}>
              <Button onClick={() => setIsGrid(false)}>
                <UnorderedListOutlined />
              </Button>
              <Button onClick={() => setIsGrid(true)}>
                <TableOutlined />
              </Button>
            </Col>
            <Col xl={3}>
              <AddBudget />{" "}
            </Col>
          </Row>
          <Row gutter={[20, 20]}>
            <Col xl={24}>
              {isGrid ? (
                <BudgetGrid budgets={budgets} onReLoad={handleReload} />
              ) : (
                <BudgetTable budgets={budgets} onReLoad={handleReload} />
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
export default Budget;
