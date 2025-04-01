import { Button, Col, Row } from "antd";
import ListBudget from "../ListBudget";
import AddBudget from "./AddBudget";

function ActionBudget() {
  return (
    <>
      <Row gutter={[10, 10]} className="mt-30 pd-20">
        <Col xl={1} style={{ marginRight: "10px" }}>
          sort
        </Col>
        <Col xl={2} style={{ marginRight: "25px" }}>
          filtẻ
        </Col>
        <Col xl={3}>clearAll</Col>
        <Col xl={10}></Col>
        <Col xl={3}></Col>
        <Col xl={3}>
          <AddBudget />
        </Col>
      </Row>
    </>
  );
}
export default ActionBudget;
