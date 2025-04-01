import MainTransaction from "../MainTransaction";
import { useSearchParams } from "react-router-dom";
function Recent() {
  const [searchParams] = useSearchParams();
  const sortOrder = searchParams.get("sort") || "";
  return (
    <>
      <div
        className="inner-wrap"
        style={{ width: "97%", borderRadius: "20px" }}
      >
        <MainTransaction recurring={false} type={""} sortOrder={sortOrder} />
      </div>
    </>
  );
}
export default Recent;
