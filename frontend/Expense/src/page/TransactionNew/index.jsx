import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import TransactionForm from "./TransactionForm";
import TransactionTable from "./TransactionTable";
import { getTransactionByUser } from "../../services/TransactionService";

function TransactionNew() {
  const [transactions, setTransactions] = useState([]);
  const userId = getCookie("id");
  const fetchApi = async () => {
    const result = await getTransactionByUser(userId);

    // Lấy tháng hiện tại
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // Lọc ngân sách theo tháng hiện tại
    const filteredByMonth = result.filter((item) => {
      const date = new Date(item.createdAt);
      return (
        date.getMonth() + 1 === currentMonth &&
        date.getFullYear() === currentYear
      );
    });
    setTransactions(filteredByMonth);
  };
  useEffect(() => {
    fetchApi();
  }, []);
  const onReload = () => {
    fetchApi();
  };
  return (
    <>
      <div className="transaction">
        <TransactionForm />
        <TransactionTable
          transactions={transactions}
          onView={(tran) => console.log("Xem:", tran)}
          onReload={onReload}
        />
      </div>
    </>
  );
}
export default TransactionNew;
