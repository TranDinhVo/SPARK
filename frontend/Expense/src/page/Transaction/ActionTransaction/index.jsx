import { Col, Row } from "antd";
import AddTransaction from "../AddTransaction";
import ClearAllTransactions from "../ClearAllTransaction";
import FilterTransaction from "../FilterTransaction";
import SortItem from "../../../components/SortItem";
function ActionTransaction(props) {
  const { onReLoad } = props;
  return (
    <>
      <Row
        gutter={[10, 10]}
        className="pd-20"
        style={{ marginTop: "20px", marginLeft: "5px" }}
      >
        <Col xl={1} style={{ marginRight: "10px" }}>
          <SortItem />
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
