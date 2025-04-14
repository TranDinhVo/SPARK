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
import SortItem from "../../components/SortItem";
import { useSearchParams } from "react-router-dom";
import FilterBudget from "./ActionBudget/FilterBudget";
import ClearAllBudget from "./ActionBudget/ClearAllBudget";

function Budget() {
  // const [budgets, setBudget] = useState([]);
  // const [isGrid, setIsGrid] = useState(false);
  // const [searchParams] = useSearchParams();
  // const sortOrder = searchParams.get("sort") || "";
  // const fetchApi = async () => {
  //   const result = await getBudget();
  //   setBudget(result);
  // };
  // useEffect(() => {
  //   fetchApi();
  // }, []);

  // const onReLoad = () => {
  //   console.log("reload");
  //   fetchApi();
  // };
  return (
    <>
      {/* <Row>
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
          <Row gutter={[10, 20]}>
            <Col xl={1} style={{ marginLeft: "20px", marginRight: "10px" }}>
              <SortItem />
            </Col>
            <Col
              xl={2}
              style={{
                marginRight: "25px",
                marginLeft: "auto",
              }}
            >
              <FilterBudget onReLoad={onReLoad} />
            </Col>
            <Col xl={3}>
              <ClearAllBudget onReLoad={onReLoad} />
            </Col>
            <Col xl={11}></Col>
            <Col xl={3}>
              <Button onClick={() => setIsGrid(false)}>
                <UnorderedListOutlined />
              </Button>
              <Button onClick={() => setIsGrid(true)}>
                <TableOutlined />
              </Button>
            </Col>
            <Col xl={3}>
              <AddBudget onReLoad={onReLoad} />
            </Col>
          </Row>
          <Row gutter={[20, 20]}>
            <Col xl={24}>
              {isGrid ? (
                <BudgetGrid budgets={budgets} onReLoad={onReLoad} />
              ) : (
                <BudgetTable
                  budgets={budgets}
                  onReLoad={onReLoad}
                  sortOrder={sortOrder}
                />
              )}
            </Col>
          </Row>
        </Col>
      </Row> */}
      budget
    </>
  );
}
export default Budget;
