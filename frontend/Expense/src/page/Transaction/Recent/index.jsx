import { Button, Col, Row } from "antd";
import { SortAscendingOutlined } from "@ant-design/icons";
import TransactionRecent from "./TransactionRecent";
function Recent() {
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
          <Button>Add</Button>
        </Col>
      </Row>
      <div
        className="inner-wrap"
        style={{ width: "97%", borderRadius: "20px" }}
      >
        <TransactionRecent />
      </div>
    </>
  );
}
export default Recent;
