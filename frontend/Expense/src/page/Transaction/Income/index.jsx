import { useSearchParams } from "react-router-dom";
import MainTransaction from "../MainTransaction";
function Income() {
  const [searchParams] = useSearchParams();
  const sortOrder = searchParams.get("sort") || "";
  return (
    <>
      <div
        className="inner-wrap"
        style={{ width: "97%", borderRadius: "20px" }}
      >
        <MainTransaction
          recurring={false}
          type={"Khoản thu"}
          sortOrder={sortOrder}
        />
      </div>
    </>
  );
}
export default Income;
