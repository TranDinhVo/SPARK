import { Button, Col, Row } from "antd";
import AddTransaction from "../AddTransaction";
import SortTransaction from "../SortTransaction";
import ClearAllTransactions from "../ClearAllTransaction";
import FilterTransaction from "../FilterTransaction";
function ActionTransaction(props) {
  const { onReLoad } = props;
  return (
    <>
      <Row gutter={[10, 10]} className="mt-30 pd-20">
        <Col xl={1} style={{ marginRight: "10px" }}>
          <SortTransaction />
        </Col>
        <Col xl={2} style={{ marginRight: "25px" }}>
          <FilterTransaction onReLoad={onReLoad} />
        </Col>
        <Col xl={3}>
          <ClearAllTransactions onReload={onReLoad} />
        </Col>
        <Col xl={13}></Col>
        <Col xl={3}>
          <AddTransaction onReLoad={onReLoad} />
        </Col>
      </Row>
    </>
  );
}
export default ActionTransaction;
