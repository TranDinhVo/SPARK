import ActionTransaction from "../ActionTransaction";
import MainTransaction from "../MainTransaction";
function Expense() {
  return (
    <>
      <ActionTransaction />
      <div
        className="inner-wrap"
        style={{ width: "97%", borderRadius: "20px" }}
      >
        <MainTransaction recurring={false} type={"Chi"} />
      </div>
    </>
  );
}
export default Expense;
