import { Button, Col, Row } from "antd";
import { SortAscendingOutlined } from "@ant-design/icons";
import AddTransaction from "../AddTransaction";
function ActionTransaction() {
  return (
    <>
      <Row gutter={[10, 10]} className="mt-30 pd-20">
        <Col xl={1} style={{ marginRight: "10px" }}>
          <Button
            icon={<SortAscendingOutlined />}
            style={{ fontSize: "20px" }}
          ></Button>
        </Col>
        <Col xl={1} style={{ marginRight: "25px" }}>
          <Button>Filter</Button>
        </Col>
        <Col xl={2}>
          <Button>Clear All</Button>
        </Col>
        <Col xl={15}></Col>
        <Col xl={2}>
          <AddTransaction />
        </Col>
      </Row>
    </>
  );
}
export default ActionTransaction;
