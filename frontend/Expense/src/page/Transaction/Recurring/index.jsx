import { useSearchParams } from "react-router-dom";
import MainTransaction from "../MainTransaction";
function Recurring() {
  const [searchParams] = useSearchParams();
  const sortOrder = searchParams.get("sort") || "";
  return (
    <>
      <div
        className="inner-wrap"
        style={{ width: "97%", borderRadius: "20px" }}
      >
        <MainTransaction recurring={true} type={""} sortOrder={sortOrder} />
      </div>
    </>
  );
}
export default Recurring;
