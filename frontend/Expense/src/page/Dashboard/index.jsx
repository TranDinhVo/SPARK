import { Row, Col } from "antd";
import CardItem from "../../components/CardItem";
import SmallExpence from "../../components/SmallExpence";
import "../../assets/scss/Dashboard.scss";
import SmallTransaction from "../../components/SmallTransaction";
import curba from "../../assets/images/currentBalance.png";
import expenseMoney from "../../assets/images/expenseMoney.png";
import incomeMoney from "../../assets/images/incomeMoney.png";
import CardSaving from "../../components/CardSaving";
import CalendarCustom from "../../components/CalendarCustom";
import DigitalClock from "../../components/DigitalClock";
function Dashboard() {
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col xl={16}>
          <Row gutter={[20, 20]}>
            <Col xl={8}>
              <CardItem
                title={"Current balance"}
                money={"1,231,500"}
                image={curba}
                style={{
                  height: "100px",
                  background: "#e3f9bf",
                  color: "#526c1b",
                }}
              ></CardItem>
            </Col>
            <Col xl={8}>
              <CardItem
                title={"Income"}
                money={"1,231,500"}
                image={incomeMoney}
                style={{
                  height: "100px",
                  background: "#f8ccbf",
                  color: "#983b13",
                }}
              ></CardItem>
            </Col>
            <Col xl={8}>
              <CardItem
                title={"Expense"}
                money={"1,231,500"}
                image={expenseMoney}
                style={{
                  height: "100px",
                  background: "#e4beff",
                  color: "#8510c8",
                }}
              ></CardItem>
            </Col>
          </Row>
          <Row gutter={[20, 20]} className="mt-20">
            <Col xl={14}>
              <SmallExpence />
            </Col>
            <Col xl={10}>
              <DigitalClock />
            </Col>
          </Row>
          <Row gutter={[20, 20]} className="mt-20">
            <Col xl={24}>
              <SmallTransaction />
            </Col>
          </Row>
        </Col>
        <Col xl={8}>
          <Row gutter={[30, 20]}>
            <Col xl={21} className="calendar ml-20">
              <CalendarCustom />
            </Col>
            <Col xl={21} className="ml-20">
              <CardSaving />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
export default Dashboard;
