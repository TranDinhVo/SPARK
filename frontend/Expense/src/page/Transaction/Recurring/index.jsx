import ActionTransaction from "../ActionTransaction";
import MainTransaction from "../MainTransaction";
function Recurring() {
  return (
    <>
      <ActionTransaction />
      <div
        className="inner-wrap"
        style={{ width: "97%", borderRadius: "20px" }}
      >
        <MainTransaction recurring={true} type={""} />
      </div>
    </>
  );
}
export default Recurring;
