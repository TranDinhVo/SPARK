import ActionTransaction from "../ActionTransaction";
import MainTransaction from "../MainTransaction";
function Recent() {
  return (
    <>
      <ActionTransaction />
      <div
        className="inner-wrap"
        style={{ width: "97%", borderRadius: "20px" }}
      >
        <MainTransaction recurring={false} type={""} />
      </div>
    </>
  );
}
export default Recent;
